import { Location as PrismaLocation } from 'database';
import { Location as LocationDto } from 'schema';
import { Mapper } from './generics';

export const LocationGetMapper: Mapper<PrismaLocation, LocationDto> = {
  map: prismaModel => {
    return prismaModel as LocationDto;
  },
};
