import { gameResultMapper } from '@src/mappers/gameResultMapper';
import { prismaClient as prisma, GameResult, User } from 'database';

export type GetResultsForLocationResult = GameResult & {
  winningTeam: {
    cumulativeTeamId: string;
  };
  locationPlayed: {
    name: string;
  };
  teams: {
    cumulativeTeamId: string;
    players: User[];
  }[];
};

export const getResultsForLocation = async (
  locationId: number,
  offset = 0,
  total = 10,
) => {
  const matches = await prisma.gameResult.findMany({
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
