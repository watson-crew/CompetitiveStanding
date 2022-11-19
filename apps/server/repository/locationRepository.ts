import prismaClient from '.';
import { Location } from 'database';
import locationMapper from '../mappers/locationMapper';

export const getLocations = async () => {
  return await prismaClient.location.findMany();
};

export const getLocationById = async (id: number): Promise<Location> => {
  const location = await prismaClient.location.findFirst({
    where: {
      id: id,
    },
  });

  if (!location) {
    return null;
  }

  return locationMapper(location);
};
