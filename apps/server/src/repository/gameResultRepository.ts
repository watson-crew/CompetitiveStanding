import { gameResultMapper } from '@src/mappers/gameResultMapper';
import { GetResultsForLocationResult } from '@src/types';
import { prismaClient as prisma } from 'database';
import { GetRecentMatchesData } from 'schema';

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
