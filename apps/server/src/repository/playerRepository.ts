import { User } from 'database';
import { prismaClient as prisma } from 'database';
import {
  executePlayerBestFriendQuery,
  executePlayerMostLostToQuery,
  executePlayerMostWinsAgainstQuery,
} from './raw/playerRawQuery';

export const getPlayerBaseStats = async (
  memorableId: string,
): Promise<{
  gamesPlayed: number;
  gamesWon: number;
  winPercentage: number;
}> => {
  const gamesPlayed = await prisma.gameResult.count({
    where: {
      teams: {
        some: {
          players: {
            some: { memorableId },
          },
        },
      },
      endTime: { not: null },
      winningTeamId: { not: null },
    },
  });

  const gamesWon = await prisma.gameResult.count({
    where: {
      winningTeam: {
        players: {
          some: { memorableId },
        },
      },
      endTime: { not: null },
      winningTeamId: { not: null },
    },
  });

  const winPercentage =
    gamesPlayed === 0
      ? 0
      : parseFloat(((gamesWon / gamesPlayed) * 100).toFixed(2));

  return { gamesPlayed, gamesWon, winPercentage };
};

export const getPlayerBestFriend = async (
  memorableId: string,
): Promise<User> => {
  return executePlayerBestFriendQuery(prisma, memorableId);
};

export const getMostWinsAgainst = async (
  memorableId: string,
): Promise<User> => {
  return executePlayerMostWinsAgainstQuery(prisma, memorableId);
};

export const getMostLostTo = async (memorableId: string): Promise<User> => {
  return executePlayerMostLostToQuery(prisma, memorableId);
};
