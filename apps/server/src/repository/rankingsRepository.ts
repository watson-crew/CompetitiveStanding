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
