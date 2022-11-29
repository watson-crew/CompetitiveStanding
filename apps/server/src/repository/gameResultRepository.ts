import { gameResultMapper, gameRankingsMapper } from '@src/mappers/gameResultMapper';
import { GetResultsForLocationResult, GetRankingsForLocationAndGameTypeResult } from '@src/types';
import { prismaClient as prisma } from 'database';
import { GetRecentMatchesData, GetRankingsForLocationData } from 'schema';

export const getResultsForLocation = async (
  locationId: number,
  offset = 0,
  total = 10,
): Promise<GetRecentMatchesData> => {
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
};

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