import { gameResultMapper } from '@src/mappers/gameResultMapper';
import { GetResultsForLocationResult } from '@src/types';
import { prismaClient as prisma, Prisma } from 'database';
import {
  GetRecentMatchesData,
  InitiateMatchResponse,
  RecordMatchResultsPayload,
  TeamHistoricResult,
} from 'schema';
import dayjs from 'dayjs';

function extractPlayerIds(teamId: string): string[] {
  if (teamId.length % 3 !== 0) throw new Error();

  return teamId.match(/.{3}/g) || [];
}

function getPlayersConnect(
  teamId: string,
): Prisma.Enumerable<Prisma.UserWhereUniqueInput> {
  const players = extractPlayerIds(teamId);
  return players.map(memorableId => ({ memorableId }));
}

function getTeamCreate(
  cumulativeTeamId: string,
): Prisma.TeamCreateWithoutGameResultsInput {
  return {
    cumulativeTeamId,
    players: {
      // All users should already exist so just a `connect` is fine
      connect: getPlayersConnect(cumulativeTeamId),
    },
  };
}

async function fetchHistoricResults(
  gameTypeId: number,
  participatingTeams: string[],
): Promise<Record<string, TeamHistoricResult>> {
  const historicResults = await prisma.gameResult.groupBy({
    by: ['winningTeamId'],
    _count: {
      winningTeamId: true,
    },
    where: {
      gameTypeId,
      teams: {
        every: {
          cumulativeTeamId: {
            in: participatingTeams,
          },
        },
      },
      winningTeamId: {
        not: null,
      },
    },
  });

  const results = Object.fromEntries(
    historicResults.map(
      historicResult =>
        [
          historicResult.winningTeamId,
          { wins: historicResult._count.winningTeamId },
        ] as [string, TeamHistoricResult],
    ),
  );

  // Since not all teams will have won, some groups may be null.
  // So we need to iterate over the original list to build up our teams
  participatingTeams.forEach(participatingTeam => {
    if (!results[participatingTeam]) {
      results[participatingTeam] = {
        wins: 0,
      };
    }
  });

  return results;
}

async function createNewMatch(
  gameTypeId: number,
  locationId: number,
  participatingTeams: string[],
): Promise<number> {
  const teamsInGame: Prisma.Enumerable<Prisma.TeamCreateOrConnectWithoutGameResultsInput> =
    participatingTeams.map(teamId => {
      return {
        create: getTeamCreate(teamId),
        where: {
          cumulativeTeamId: teamId,
        },
      };
    });

  const createResult = await prisma.gameResult.create({
    data: {
      startTime: dayjs().toDate(),
      gameTypeId: gameTypeId,
      locationPlayedId: locationId,
      teams: {
        connectOrCreate: teamsInGame,
      },
    },
  });

  return createResult.id;
}

export async function initiateNewMatch(
  gameTypeId: number,
  locationId: number,
  participatingTeams: string[],
): Promise<InitiateMatchResponse> {
  const [historicResults, matchId] = await Promise.all([
    fetchHistoricResults(gameTypeId, participatingTeams),
    createNewMatch(gameTypeId, locationId, participatingTeams),
  ]);

  return {
    historicResults,
    matchId,
  };
}

export async function updateGameResult(
  gameId: number,
  { winningTeamId }: RecordMatchResultsPayload,
): Promise<boolean> {
  try {
    await prisma.gameResult.update({
      data: {
        winningTeamId,
        endTime: dayjs().toDate(),
      },
      where: {
        id: gameId,
      },
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function getResultsForLocation(
  locationId: number,
  offset = 0,
  total = 10,
): Promise<GetRecentMatchesData> {
  const matches: GetResultsForLocationResult[] =
    await prisma.gameResult.findMany({
      where: {
        locationPlayedId: locationId,
      },
      include: {
        winningTeam: {
          select: {
            cumulativeTeamId: true,
          },
        },
        locationPlayed: {
          select: {
            name: true,
          },
        },
        teams: {
          select: {
            cumulativeTeamId: true,
            players: true,
          },
        },
      },
      orderBy: {
        endTime: 'desc',
      },
      skip: offset,
      take: total,
    });

  return gameResultMapper.map(matches);
}
