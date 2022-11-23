import { Location } from 'schema';
import { prismaClient as prisma } from 'database';
import { LocationGetMapper } from '../mappers/locationMapper';

export const getLocations = async (): Promise<Location[]> => {
  const locations = await prisma.location.findMany();
  return locations.map(LocationGetMapper.map);
};

export const getLocationById = async (id: number): Promise<Location> => {
  const location = await prisma.location.findFirst({
    where: {
      id: id,
    },
  });

  if (!location) {
    return null;
  }

  return LocationGetMapper.map(location);
};
