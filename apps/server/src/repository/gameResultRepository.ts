import { gameResultMapper, gameRankingsMapper } from '@src/mappers/gameResultMapper';
import { GetResultsForLocationResult, GetRankingsForLocationAndGameTypeResult } from '@src/types';
import { prismaClient as prisma, Prisma } from 'database';
import {
  GetRecentMatchesData,
  GetRankingsForLocationData,
  InitiateMatchResponse,
  TeamHistoricResult,
  WinningTeamDetails,
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

export const getRankingsForLocation = async (
  locationId: number,
  gameTypeId: number,
  offset = 0,
  total = 3
): Promise<GetRankingsForLocationData> => {
    // Number of wins/games played per team
    // const rankings = await prisma.team.findMany({
    //   include: {
    //     _count: {
    //       select: {
    //         gameResults: true,
    //         wonGames: true
    //       }
    //     }
    //   },
    //   orderBy: [
    //     { wonGames: { _count: 'desc' }},
    //     { gameResults: { _count: 'asc' }}
    //   ],
    //   take: total
    // })

    // Number of wins/games played per team that each player is in
    // const rankings = await prisma.user.findMany({
    //   include: {
    //     teams: {
    //       include: {
    //         _count: {
    //           select: {
    //             gameResults: true,
    //             wonGames: true
    //           }
    //         }
    //       }
    //     }
    //   }
    // });

    const rankings = await prisma.$queryRaw<GetRankingsForLocationAndGameTypeResult[]>`
        SELECT
          u.*,
          COUNT(*) AS gamesPlayed,
          COUNT(CASE WHEN t.cumulativeTeamId = gr.winningTeamId THEN 1 END) AS gamesWon
        FROM [dbo].[User] AS u
        JOIN [dbo].[_TeamToUser] AS t2u ON u.id = t2u.B
        JOIN [dbo].[Team] AS t ON t2u.A = t.id
        JOIN [dbo].[_GameResultToTeam] AS gr2t ON gr2t.B = t.id
        JOIN [dbo].[GameResult] AS gr ON gr.id = gr2t.A
        WHERE gr.locationPlayedId = ${locationId}
        AND gr.gameTypeId = ${gameTypeId}
        GROUP BY u.id, u.memorableId, u.firstName, u.lastName, u.profilePicture, u.locationId
        ORDER BY GamesWon DESC, GamesPlayed ASC
        OFFSET ${offset} ROWS
        FETCH NEXT ${total} ROWS ONLY
        ;
    `;

    return gameRankingsMapper.map(rankings);
}
