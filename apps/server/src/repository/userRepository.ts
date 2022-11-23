import { prismaClient as prisma, PrismaTypes, UserWithLocation } from 'database';
import { User as UserDto, UserInput as UserInputDto } from 'schema';
import { StringDecoder } from 'string_decoder';
import { UserGetMapper, UserCreateMapper } from '../mappers/userMapper';

export const getUsers = async () => {
  return await prisma.user.findMany();
};

export const getUsersWithLocations = async (): Promise<UserWithLocation[]> => {
  return await prisma.user.findMany({include: {location: true}});
}

// TODO: Add types for UserWithLocation, User (without location) etc.
export const getUserByMemorableId = async (id: string): Promise<UserDto> => {
  const user: UserWithLocation = await prisma.user.findFirst({
    where: {
      memorableId: id,
    },
    include: {
      location: true,
    },
  });

  if (!user) {
    return null;
  }

  return UserGetMapper.map(user);
};

export const createUser = async (user: UserInputDto): Promise<boolean> => {
  const insertedUser = await prisma.user.create({
    data: UserCreateMapper.map(user)
  });

  return true;
}
