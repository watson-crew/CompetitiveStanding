import { TeamRankingsMapper } from '@src/mappers/playerRankingsMapper';
import { DEFAULT_ELO } from '@src/utils/eloCalculation';
import { prismaClient as prisma } from 'database';

const getElosForGame = async (gameId: number) => {
  const x = prisma.gameResult.findUnique({
    where: {
      id: gameId,
    },
    include: {
      teams: {
        include: {
          players: {
            include: {
              ranking: {
                where: {
                  gameTypeId: 1,
                },
              },
            },
          },
        },
      },
    },
  });
};

export async function getParticipantElos(
  gameTypeId: number,
  participatingTeams: string[],
): Promise<Record<string, number>> {
  const elos = await prisma.team.findMany({
    select: {
      players: {
        select: {
          memorableId: true,
          ranking: {
            select: {
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
    setPlayerElo(player, gameTypeId, DEFAULT_ELO),
  );

  return playerElos;
}

async function setPlayerElo(
  playerMemorableId: string,
  gameTypeId: number,
  elo: number,
): Promise<void> {
  await prisma.playerRanking.upsert({
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
): Promise<Record<string, number>> => {
  await Promise.all(
    Object.entries(playerRankings).map(async ([userMemorableId, newElo]) => {
      return (
        await prisma.playerRanking.update({
          data: {
            elo: newElo,
          },
          where: {
            userMemorableId_gameTypeId: {
              userMemorableId,
              gameTypeId,
            },
          },
        })
      ).elo;
    }),
  );

  return {};
};
