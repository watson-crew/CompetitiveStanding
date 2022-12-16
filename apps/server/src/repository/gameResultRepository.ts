import {
  gameResultMapper,
  gameRankingsMapper,
} from '@src/mappers/gameResultMapper';
import { GetResultsForLocationResult } from '@src/types';
import { prismaClient as prisma, Prisma } from 'database';
import {
  GetRecentMatchesData,
  GetRankingsForLocationData,
  InitiateMatchResponse,
  TeamHistoricResult,
  WinningTeamDetails,
  ResultFilterType,
  RankedPlayer,
} from 'schema';
import dayjs from 'dayjs';
import executeRankingQuery, {
  RankingForSortTypeQueryParams,
} from './raw/rankingRawQuery';

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
  // FIXME: This doesn't seem to work when we have more than 2 teams

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
): Promise<Omit<InitiateMatchResponse, 'playerRatings'>> {
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
  { winningTeamId }: WinningTeamDetails,
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

export async function abandonMatch(matchId: number): Promise<boolean> {
  try {
    await prisma.gameResult.deleteMany({
      where: {
        id: matchId,
        winningTeamId: {
          equals: null,
        },
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
        winningTeamId: {
          not: null,
        },
      },
      include: {
        gameType: true,
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
        ratingChanges: {
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

export async function getResultsForPlayer(
  memorableId: string,
  offset = 0,
  total = 10,
): Promise<GetRecentMatchesData> {
  const matches: GetResultsForLocationResult[] =
    await prisma.gameResult.findMany({
      where: {
        teams: {
          every: {
            players: {
              some: {
                memorableId,
              },
            },
          },
        },
        winningTeamId: {
          not: null,
        },
      },
      include: {
        gameType: true,
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
        ratingChanges: {
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

const additionalParamsForSortType: Record<
  ResultFilterType,
  Partial<RankingForSortTypeQueryParams>
> = {
  elo: {
    minRequiredGames: 1,
  },
  winPercentage: {
    minRequiredGames: 5,
  },
  wins: {
    minRequiredWins: 1,
  },
};

export const getTopRankingsForLocation = async (
  locationId: number,
  gameTypeId: number,
  offset = 0,
  total = 3,
  filterTypes: ResultFilterType[],
): Promise<GetRankingsForLocationData> => {
  const getRankingForTypePromises = filterTypes.map(
    async (resultSortType: ResultFilterType) => {
      const queryParams = {
        locationId,
        gameTypeId,
        offset,
        total,
        ...additionalParamsForSortType[resultSortType],
      };

      const queryPromise = executeRankingQuery(
        prisma,
        resultSortType,
        queryParams,
      );

      return [resultSortType, gameRankingsMapper.map(await queryPromise)] as [
        ResultFilterType,
        RankedPlayer[],
      ];
    },
  );

  return Object.fromEntries(await Promise.all(getRankingForTypePromises));
};
