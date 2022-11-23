import { Location } from 'schema';
import { prismaClient as prisma } from 'database';
import { mapLocation } from '../mappers/locationMapper';

export const getLocations = async (): Promise<Location[]> => {
  const locations = await prisma.location.findMany();
  return locations.map(mapLocation);
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

  return mapLocation(location);
};
