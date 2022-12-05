import { Location } from 'schema';
import { prismaClient as prisma } from 'database';
import { LocationGetMapper } from '../mappers/locationMapper';

const locationQuery = {
  include: {
    availableGames: {
      include: {
        requirements: true,
      },
    },
    users: {
      select: {
        _count: true,
      },
    },
  },
};

export const getLocations = async (): Promise<Location[]> => {
  const locations = await prisma.location.findMany(locationQuery);
  return locations.map(LocationGetMapper.map);
};

export const getLocationByUrl = async (urlPath: string): Promise<Location> => {
  const location = await prisma.location.findFirst({
    ...locationQuery,
    where: {
      urlPath: urlPath,
    },
  });

  if (!location) {
    return null;
  }

  return LocationGetMapper.map(location);
};
