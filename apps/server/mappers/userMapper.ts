import { User as PrismaUser, Location } from 'database';
import { User as UserDto } from 'schema';

export function mapUserWithLocation(
  prismaUser: PrismaUser & { location: Location },
): UserDto {
  console.log(prismaUser);

  return {
    id: prismaUser.id.toString(),
    memorableId: prismaUser.memorableId,
    firstName: prismaUser.firstName,
    lastName: prismaUser.lastName,
    location: prismaUser.location?.name ?? 'default', // Optional?
    profilePicture: prismaUser.profilePicture, // Optional?
  };
}
