import { Location } from 'schema';
import { prisma } from 'database';
import locationMapper from '../mappers/locationMapper';

export const getLocations = async () => {
  return await prisma.location.findMany();
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

  return locationMapper(location);
};
