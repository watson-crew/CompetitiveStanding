import { prismaClient as prisma } from 'database';
import { User } from 'schema';

export const getPlayerBaseStats = async (
  memorableId: string,
): Promise<{
  gamesPlayed: number;
  gamesWon: number;
  winPercentage: number;
}> => {
  // Find the total number of game results where the user with the given memorable ID is a player
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

  // Find the total number of game results where the user with the given memorable ID is a player in a winning team
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

  // Calculate the win percentage as a decimal
  const winPercentage =
    gamesPlayed === 0
      ? 0
      : parseFloat(((gamesWon / gamesPlayed) * 100).toFixed(2));

  // Return the gamesPlayed, gamesWon, and winPercentage values
  return { gamesPlayed, gamesWon, winPercentage };
};

export const getPlayerBestFriend = async (
  memorableId: string,
): Promise<User | null> => {
  // Find the game results where the user with the given memorable ID is a player
  const gameResults = await prisma.gameResult.findMany({
    where: {
      teams: {
        some: {
          players: {
            some: {
              memorableId: memorableId,
            },
          },
        },
      },
      endTime: {
        not: null,
      },
      winningTeamId: {
        not: null,
      },
    },
    include: {
      teams: {
        select: {
          cumulativeTeamId: true,
          players: true,
        },
      },
    },
  });

  if (!gameResults) {
    return null;
  }

  // Extract the IDs of the opponents from the game results
  const opponentIds = gameResults.flatMap(result => {
    const opponents = result.teams
      .filter(team => team.cumulativeTeamId !== memorableId)
      .flatMap(team => team.players.map(player => player.memorableId));
    return opponents;
  });

  // Find the opponents with the extracted IDs
  const opponents = await prisma.user.findMany({
    where: {
      memorableId: {
        in: opponentIds,
      },
    },
  });

  // Count the number of times the user has played against each opponent
  const opponentCounts = opponentIds.reduce((counts, id) => {
    if (!counts[id]) {
      counts[id] = 0;
    }
    counts[id]++;
    return counts;
  }, {});

  if (Object.keys(opponentCounts).length === 0) {
    return null;
  }

  // Sort the opponents by the number of times the user has played against them
  // and return the one that the user has played against the most
  const bestFriend = opponents.sort(
    (a, b) => opponentCounts[b.memorableId] - opponentCounts[a.memorableId],
  )[0];

  if (!bestFriend) {
    return null;
  }

  return bestFriend;
};

export const getMostWinsAgainst = async (
  memorableId: string,
): Promise<User | null> => {
  // Find the user with the given memorable ID and include their teams in the result
  const user = await prisma.user
    .findFirst({
      where: {
        teams: {
          some: {
            wonGames: {
              some: {
                winningTeamId: memorableId,
              },
            },
          },
        },
      },
      include: {
        teams: {
          select: {
            wonGames: {
              select: {
                teams: true,
                winningTeamId: true,
              },
            },
          },
        },
      },
    })
    .then(user => user);

  if (!user) {
    return null;
  }

  // Extract the IDs of the opponents from the won games
  const opponentIds = user.teams.flatMap(team => {
    return team.wonGames.flatMap(game => {
      return game.teams
        .filter(team => team.cumulativeTeamId !== memorableId)
        .map(team => team.cumulativeTeamId);
    });
  });

  // Count the number of times the user has won against each opponent
  const opponentCounts = opponentIds.reduce((counts, id) => {
    if (!counts[id]) {
      counts[id] = 0;
    }
    counts[id]++;
    return counts;
  }, {});

  if (Object.keys(opponentCounts).length === 0) {
    return null;
  }

  // Find the opponent that the user has won against the most
  const mostWonAgainst = Object.keys(opponentCounts).reduce(
    (max, opponentId) => {
      return opponentCounts[opponentId] > opponentCounts[max]
        ? opponentId
        : max;
    },
  );

  // Find the opponent with the ID of the opponent that the user has won against the most
  const easyPickings = await prisma.user.findFirst({
    where: {
      memorableId: mostWonAgainst,
    },
  });

  if (!easyPickings) {
    return null;
  }

  return easyPickings;
};

export const getMostLostAgainst = async (
  memorableId: string,
): Promise<User | null> => {
  // Find the user with the given memorable ID and include their game results in the result
  const user = await prisma.user
    .findFirst({
      where: {
        memorableId: memorableId,
      },
      include: {
        teams: {
          select: {
            gameResults: {
              select: {
                teams: true,
                winningTeamId: true,
              },
            },
          },
        },
      },
    })
    .then(user => user);

  if (!user) {
    return null;
  }

  // Extract the IDs of the opponents from the lost games
  const opponentIds = user.teams.flatMap(team => {
    return team.gameResults
      .filter(game => game.winningTeamId !== memorableId)
      .flatMap(game => {
        return game.teams
          .filter(team => team.cumulativeTeamId !== memorableId)
          .map(team => team.cumulativeTeamId);
      });
  });

  // Count the number of times the user has lost against each opponent
  const opponentCounts = opponentIds.reduce((counts, id) => {
    if (!counts[id]) {
      counts[id] = 0;
    }
    counts[id]++;
    return counts;
  }, {});

  if (Object.keys(opponentCounts).length === 0) {
    return null;
  }

  // Find the opponent that the user has lost against the most
  const mostLostAgainst = Object.keys(opponentCounts).reduce(
    (max, opponentId) => {
      return opponentCounts[opponentId] > opponentCounts[max]
        ? opponentId
        : max;
    },
  );

  // Find the opponent with the ID of the opponent that the user has lost against the most
  const nemesis = await prisma.user.findFirst({
    where: {
      memorableId: mostLostAgainst,
    },
  });

  if (!nemesis) {
    return null;
  }

  return nemesis;
};
