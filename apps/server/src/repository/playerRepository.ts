import { prismaClient as prisma } from 'database';

export const getPlayerBaseStats = async (
  memorableId: string,
): // eslint-disable-next-line @typescript-eslint/no-explicit-any
Promise<any> => {
  const gamesPlayed = await prisma.gameResult.count({
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
    },
  });

  const gamesWon = await prisma.gameResult.count({
    where: {
      winningTeam: {
        players: {
          some: {
            memorableId: memorableId,
          },
        },
      },
    },
  });

  const winPercentage = gamesWon / gamesPlayed;

  return { winPercentage, gamesWon, gamesPlayed };
};

export const getPlayerBestFriend = async (memorableId: string) => {
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

  // Sort the opponents by the number of times the user has played against them
  // and return the one that the user has played against the most
  const mostPlayedAgainst = opponents.sort(
    (a, b) => opponentCounts[b.memorableId] - opponentCounts[a.memorableId],
  )[0];

  return mostPlayedAgainst;
};

export const getMostWinsAgainst = async (memorableId: string) => {
  // Find the user with the given memorable ID and include their teams in the result
  const user = await prisma.user
    .findMany({
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
    .then(users => users[0]);

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

  // Find the opponent that the user has won against the most
  const mostWonAgainst = Object.keys(opponentCounts).reduce(
    (max, opponentId) => {
      return opponentCounts[opponentId] > opponentCounts[max]
        ? opponentId
        : max;
    },
  );

  // Find the opponent with the ID of the opponent that the user has won against the most
  return await prisma.user.findFirst({
    where: {
      memorableId: mostWonAgainst,
    },
  });
};

export const getMostLostAgainst = async (memorableId: string) => {
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

  // Find the opponent that the user has lost against the most
  const mostLostAgainst = Object.keys(opponentCounts).reduce(
    (max, opponentId) => {
      return opponentCounts[opponentId] > opponentCounts[max]
        ? opponentId
        : max;
    },
  );

  // Find the opponent with the ID of the opponent that the user has lost against the most
  return await prisma.user.findFirst({
    where: {
      memorableId: mostLostAgainst,
    },
  });
};
