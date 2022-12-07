import {
  RankedTeamMapper,
  TeamRankingsMapper,
} from '@src/mappers/playerRankingsMapper';
import {
  GetPlayerRatingResult,
  GetTeamPlayerRankingsResult,
  GetTeamRankingsResult,
  PlayerRankingResult,
} from '@src/types';
import { DEFAULT_ELO, getUpdatedRankings } from '@src/utils/eloCalculation';
import { Prisma, prismaClient as prisma, PrismaClient } from 'database';
import { WinningTeamDetails } from 'schema';

const getRankingsForMatch = async (
  matchId: number,
  gameTypeId: number,
): Promise<GetTeamRankingsResult[]> => {
  // Get player elos
  return (
    await prisma.gameResult.findUnique({
      select: {
        teams: {
          select: {
            cumulativeTeamId: true,
            players: {
              select: {
                memorableId: true,
                rankings: {
                  select: {
                    id: true,
                    elo: true,
                  },
                  where: {
                    gameTypeId,
                  },
                },
              },
            },
          },
        },
      },
      where: {
        id: matchId,
      },
    })
  ).teams;
};

export async function updateElosForMatch(
  matchId: number,
  updateDetails: WinningTeamDetails,
): Promise<Record<string, number>> {
  // Bit annoying we have to do two separate queries...
  const { gameTypeId } = await prisma.gameResult.findUnique({
    where: {
      id: matchId,
    },
    select: {
      gameTypeId: true,
    },
  });

  const oldTeamRankings = await getRankingsForMatch(matchId, gameTypeId);

  const { winningTeamId } = updateDetails;

  const rankedTeams = oldTeamRankings.map(RankedTeamMapper.map);

  const computedUpdatedRankings = getUpdatedRankings(
    rankedTeams,
    winningTeamId,
  );

  const savedUpdatedRankings = await updatePlayerRankings(
    gameTypeId,
    computedUpdatedRankings,
  );

  const eloChanges = await saveEloChanges(
    matchId,
    getRankDifferentials(oldTeamRankings, savedUpdatedRankings),
  );

  return Object.fromEntries(
    eloChanges.map(change => [
      change.playerRanking.player.memorableId,
      change.ratingChangeAmount,
    ]),
  );
}

function getRankDifferentials(
  oldRanks: GetTeamRankingsResult[],
  newRanks: PlayerRankingResult[],
): Record<number, number> {
  const oldRanksMap = Object.fromEntries(
    oldRanks.flatMap(team =>
      team.players.flatMap(player =>
        player.rankings.map(({ id, elo }) => [id, elo]),
      ),
    ),
  );

  return Object.fromEntries(
    newRanks.map(({ id, elo }) => [id, elo - oldRanksMap[id]]),
  );
}

async function saveEloChanges(
  gameId: number,
  ratingChanges: Record<number, number>,
): Promise<GetPlayerRatingResult[]> {
  return await prisma.$transaction(prisma => {
    const updates = Object.entries(ratingChanges).map(
      async ([id, ratingChange]) =>
        saveEloChange(prisma, gameId, parseInt(id), ratingChange),
    );
    return Promise.all(updates);
  });
}

async function saveEloChange(
  prismaClient: PrismaClient | Prisma.TransactionClient,
  gameId: number,
  playerRankingId: number,
  playerRatingDifference: number,
): Promise<GetPlayerRatingResult> {
  return await prismaClient.ratingChange.create({
    select: {
      playerRanking: {
        select: {
          player: {
            select: {
              memorableId: true,
            },
          },
        },
      },
      ratingChangeAmount: true,
    },
    data: {
      ratingChangeAmount: playerRatingDifference,
      playerRankingId: playerRankingId,
      gameResultId: gameId,
    },
  });
}

export async function getParticipantElos(
  gameTypeId: number,
  participatingTeams: string[],
): Promise<Record<string, number>> {
  const elos: GetTeamPlayerRankingsResult[] = await prisma.team.findMany({
    select: {
      players: {
        select: {
          memorableId: true,
          rankings: {
            select: {
              id: true,
              elo: true,
            },
            where: {
              gameTypeId,
            },
          },
        },
      },
    },
    where: {
      cumulativeTeamId: {
        in: participatingTeams,
      },
    },
  });

  const { elos: playerElos, playersMissingElos } = TeamRankingsMapper.map(elos);

  // Create new entry with default elo for any players without
  playersMissingElos.forEach(player =>
    setPlayerElo(prisma, player, gameTypeId, DEFAULT_ELO),
  );

  return playerElos;
}

async function setPlayerElo(
  prismaClient: PrismaClient | Prisma.TransactionClient,
  playerMemorableId: string,
  gameTypeId: number,
  elo: number,
): Promise<PlayerRankingResult> {
  return await prismaClient.playerRanking.upsert({
    select: {
      id: true,
      userMemorableId: true,
      elo: true,
    },
    create: {
      gameTypeId: gameTypeId,
      userMemorableId: playerMemorableId,
      elo,
    },
    update: {
      elo,
    },
    where: {
      userMemorableId_gameTypeId: {
        gameTypeId,
        userMemorableId: playerMemorableId,
      },
    },
  });
}

const updatePlayerRankings = async (
  gameTypeId: number,
  playerRankings: Record<string, number>,
): Promise<PlayerRankingResult[]> => {
  return await prisma.$transaction(prisma => {
    const updates = Object.entries(playerRankings).map(
      async ([memorableId, newRanking]) =>
        setPlayerElo(prisma, memorableId, gameTypeId, newRanking),
    );
    return Promise.all(updates);
  });
};
