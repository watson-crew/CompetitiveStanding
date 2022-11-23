// import { Location as PrismaLocation } from 'database';
import { Location as LocationDto } from 'schema';

export function mapLocation(prismaLocation: any): LocationDto {
  return prismaLocation as LocationDto;
}
