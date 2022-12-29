import { PrismaClient, User } from 'database';

export const executePlayerBestFriendQuery = async (
  prisma: PrismaClient,
  memorableId,
): Promise<User | null> => {
  const bestFriend = await prisma.$queryRaw`
    SELECT TOP 1 u2.*, COUNT(*) as gamesPlayedTogether
    FROM [dbo].[User] AS u1
    JOIN [dbo].[_TeamToUser] AS t2u1 ON u1.id = t2u1.B
    JOIN [dbo].[Team] AS t1 ON t2u1.A = t1.id
    JOIN [dbo].[_GameResultToTeam] AS gr2t1 ON gr2t1.B = t1.id
    JOIN [dbo].[GameResult] AS gr ON gr.id = gr2t1.A AND gr.endTime IS NOT NULL
    JOIN [dbo].[_GameResultToTeam] AS gr2t2 ON gr2t2.A = gr.id
    JOIN [dbo].[Team] AS t2 ON t2.id = gr2t2.B
    JOIN [dbo].[_TeamToUser] AS t2u2 ON t2u2.A = t2.id
    JOIN [dbo].[User] AS u2 ON u2.id = t2u2.B
    WHERE u1.memorableId = ${memorableId} AND u1.id != u2.id
    GROUP BY u2.id, u2.memorableId, u2.firstName, u2.lastName, u2.profilePicture, u2.locationId
    ORDER BY gamesPlayedTogether DESC
  `;

  return bestFriend[0];
};

export const executePlayerMostWinsAgainstQuery = async (
  prisma: PrismaClient,
  memorableId: string,
): Promise<User | null> => {
  const mostWonAgainst = await prisma.$queryRaw`
    SELECT TOP 1 u2.*, COUNT(*) as gamesWon
    FROM [dbo].[User] AS u1
    JOIN [dbo].[_TeamToUser] AS t2u1 ON u1.id = t2u1.B
    JOIN [dbo].[Team] AS t1 ON t2u1.A = t1.id
    JOIN [dbo].[_GameResultToTeam] AS gr2t1 ON gr2t1.B = t1.id
    JOIN [dbo].[GameResult] AS gr ON gr.id = gr2t1.A AND gr.endTime IS NOT NULL AND gr.winningTeamId = t1.cumulativeTeamId
    JOIN [dbo].[_GameResultToTeam] AS gr2t2 ON gr2t2.A = gr.id
    JOIN [dbo].[Team] AS t2 ON t2.id = gr2t2.B
    JOIN [dbo].[_TeamToUser] AS t2u2 ON t2u2.A = t2.id
    JOIN [dbo].[User] AS u2 ON u2.id = t2u2.B
    WHERE u1.memorableId = ${memorableId} AND u1.id != u2.id
    GROUP BY u2.id, u2.memorableId, u2.firstName, u2.lastName, u2.profilePicture, u2.locationId
    ORDER BY gamesWon DESC
  `;

  return mostWonAgainst[0];
};

export const executePlayerMostLostToQuery = async (
  prisma: PrismaClient,
  memorableId,
): Promise<User | null> => {
  const mostLostTo = await prisma.$queryRaw`
    SELECT TOP 1 u2.*, COUNT(*) as gamesLost
    FROM [dbo].[User] AS u1
    JOIN [dbo].[_TeamToUser] AS t2u1 ON u1.id = t2u1.B
    JOIN [dbo].[Team] AS t1 ON t2u1.A = t1.id
    JOIN [dbo].[_GameResultToTeam] AS gr2t1 ON gr2t1.B = t1.id
    JOIN [dbo].[GameResult] AS gr ON gr.id = gr2t1.A AND gr.endTime IS NOT NULL
    JOIN [dbo].[_GameResultToTeam] AS gr2t2 ON gr2t2.A = gr.id
    JOIN [dbo].[Team] AS t2 ON t2.id = gr2t2.B
    JOIN [dbo].[_TeamToUser] AS t2u2 ON t2u2.A = t2.id
    JOIN [dbo].[User] AS u2 ON u2.id = t2u2.B
    WHERE u1.memorableId = ${memorableId} AND u1.id != u2.id AND t2.cumulativeTeamId = gr.winningTeamId
    GROUP BY u2.id, u2.memorableId, u2.firstName, u2.lastName, u2.profilePicture, u2.locationId
    ORDER BY gamesLost DESC
  `;

  return mostLostTo[0];
};
