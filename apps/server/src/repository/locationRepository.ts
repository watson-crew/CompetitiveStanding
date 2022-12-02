import { Location } from 'schema';
import { prismaClient as prisma } from 'database';
import { LocationGetMapper } from '../mappers/locationMapper';

export const getLocations = async (): Promise<Location[]> => {
  const locations = await prisma.location.findMany();
  return locations.map(LocationGetMapper.map);
};

export const getLocationByUrl = async (urlPath: string): Promise<Location> => {
  const location = await prisma.location.findFirst({
    include: {
      users: {
        select: {
          _count: true,
        },
      },
    },
    where: {
      urlPath: urlPath,
    },
  });

  if (!location) {
    return null;
  }

  return LocationGetMapper.map(location);
};
