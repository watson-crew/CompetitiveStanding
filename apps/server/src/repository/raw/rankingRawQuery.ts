import { GetRankingsForLocationAndGameTypeResult } from '@src/types';
import { PrismaClient } from 'database';
import { ResultFilterType } from 'schema';

export type RankingForSortTypeQueryParams = {
  locationId: number;
  gameTypeId: number;
  offset?: number;
  total?: number;
  minRequiredGames?: number;
  minRequiredWins?: number;
};

type RankingQuery = (
  prisma: PrismaClient,
  queryParams: RankingForSortTypeQueryParams,
) => Promise<GetRankingsForLocationAndGameTypeResult[]>;

const executeTotalWinsRankingQuery: RankingQuery = async (
  prisma: PrismaClient,
  { locationId, gameTypeId, offset, total, minRequiredWins, minRequiredGames },
) => {
  return await prisma.$queryRaw`SELECT
    u.*,
    COUNT(*) AS gamesPlayed,
    COUNT(CASE WHEN t.cumulativeTeamId = gr.winningTeamId THEN 1 END) AS gamesWon,
    CONVERT(int, (CONVERT(decimal, COUNT(CASE WHEN t.cumulativeTeamId = gr.winningTeamId THEN 1 END)) / COUNT(*)) * 100) AS winPercentage,
    pr.elo
    FROM [dbo].[User] AS u
    JOIN [dbo].PlayerRanking AS pr ON pr.userMemorableId = u.memorableId
    JOIN [dbo].[_TeamToUser] AS t2u ON u.id = t2u.B
    JOIN [dbo].[Team] AS t ON t2u.A = t.id
    JOIN [dbo].[_GameResultToTeam] AS gr2t ON gr2t.B = t.id
    JOIN [dbo].[GameResult] AS gr ON gr.id = gr2t.A AND gr.endTime IS NOT NULL
    WHERE gr.locationPlayedId = ${locationId}
    AND gr.gameTypeId = ${gameTypeId}
    GROUP BY u.id, u.memorableId, u.firstName, u.lastName, u.profilePicture, u.locationId, pr.elo
    HAVING COUNT(CASE WHEN t.cumulativeTeamId = gr.winningTeamId THEN 1 END) >= ${minRequiredWins} AND COUNT(*) >= ${minRequiredGames}
    ORDER BY GamesWon DESC, GamesPlayed ASC
    OFFSET ${offset} ROWS
    FETCH NEXT ${total} ROWS ONLY;`;
};

const executeWinPercentageRankingQuery: RankingQuery = async (
  prisma: PrismaClient,
  { locationId, gameTypeId, offset, total, minRequiredWins, minRequiredGames },
) => {
  return await prisma.$queryRaw`SELECT
    u.*,
    COUNT(*) AS gamesPlayed,
    COUNT(CASE WHEN t.cumulativeTeamId = gr.winningTeamId THEN 1 END) AS gamesWon,
    CONVERT(int, (CONVERT(decimal, COUNT(CASE WHEN t.cumulativeTeamId = gr.winningTeamId THEN 1 END)) / COUNT(*)) * 100) AS winPercentage,
    pr.elo
    FROM [dbo].[User] AS u
    JOIN [dbo].PlayerRanking AS pr ON pr.userMemorableId = u.memorableId
    JOIN [dbo].[_TeamToUser] AS t2u ON u.id = t2u.B
    JOIN [dbo].[Team] AS t ON t2u.A = t.id
    JOIN [dbo].[_GameResultToTeam] AS gr2t ON gr2t.B = t.id
    JOIN [dbo].[GameResult] AS gr ON gr.id = gr2t.A AND gr.endTime IS NOT NULL
    WHERE gr.locationPlayedId = ${locationId}
    AND gr.gameTypeId = ${gameTypeId}
    GROUP BY u.id, u.memorableId, u.firstName, u.lastName, u.profilePicture, u.locationId, pr.elo
    HAVING COUNT(CASE WHEN t.cumulativeTeamId = gr.winningTeamId THEN 1 END) >= ${minRequiredWins} AND COUNT(*) >= ${minRequiredGames}
    ORDER BY winPercentage DESC, GamesPlayed DESC
    OFFSET ${offset} ROWS
    FETCH NEXT ${total} ROWS ONLY;`;
};

const executeEloRankingQuery: RankingQuery = async (
  prisma: PrismaClient,
  { locationId, gameTypeId, offset, total, minRequiredWins, minRequiredGames },
) => {
  return await prisma.$queryRaw`SELECT
    u.*,
    COUNT(*) AS gamesPlayed,
    COUNT(CASE WHEN t.cumulativeTeamId = gr.winningTeamId THEN 1 END) AS gamesWon,
    CONVERT(int, (CONVERT(decimal, COUNT(CASE WHEN t.cumulativeTeamId = gr.winningTeamId THEN 1 END)) / COUNT(*)) * 100) AS winPercentage,
    pr.elo
    FROM [dbo].[User] AS u
    JOIN [dbo].PlayerRanking AS pr ON pr.userMemorableId = u.memorableId
    JOIN [dbo].[_TeamToUser] AS t2u ON u.id = t2u.B
    JOIN [dbo].[Team] AS t ON t2u.A = t.id
    JOIN [dbo].[_GameResultToTeam] AS gr2t ON gr2t.B = t.id
    JOIN [dbo].[GameResult] AS gr ON gr.id = gr2t.A AND gr.endTime IS NOT NULL
    WHERE gr.locationPlayedId = ${locationId}
    AND gr.gameTypeId = ${gameTypeId}
    GROUP BY u.id, u.memorableId, u.firstName, u.lastName, u.profilePicture, u.locationId, pr.elo
    HAVING COUNT(CASE WHEN t.cumulativeTeamId = gr.winningTeamId THEN 1 END) >= ${minRequiredWins} AND COUNT(*) >= ${minRequiredGames}
    ORDER BY elo DESC, GamesPlayed DESC
    OFFSET ${offset} ROWS
    FETCH NEXT ${total} ROWS ONLY;`;
};

const queryTypeMappings: Record<ResultFilterType, RankingQuery> = {
  elo: executeEloRankingQuery,
  winPercentage: executeWinPercentageRankingQuery,
  wins: executeTotalWinsRankingQuery,
};

export default async function executeRankingQuery(
  prisma: PrismaClient,
  queryType: ResultFilterType,
  params: RankingForSortTypeQueryParams,
): Promise<GetRankingsForLocationAndGameTypeResult[]> {
  const queryParams: RankingForSortTypeQueryParams = {
    minRequiredGames: 0,
    minRequiredWins: 0,
    offset: 0,
    total: 0,
    ...params,
  };

  return queryTypeMappings[queryType](prisma, queryParams);
}
