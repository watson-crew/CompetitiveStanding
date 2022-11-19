import { Location as PrismaLocation } from 'database';
import { Location as LocationDto } from 'schema';

export default function mapLocation(
  prismaLocation: PrismaLocation,
): LocationDto {
  return prismaLocation;
}
