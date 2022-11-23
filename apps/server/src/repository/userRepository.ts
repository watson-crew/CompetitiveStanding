import { prismaClient as prisma, PrismaTypes, UserWithLocation } from 'database';
import { User as UserDto, CreateUserPayload as UserInputDto } from 'schema';
import { UserGetMapper, UserCreateMapper } from '../mappers/userMapper';

export const getUsers = async () => {
  return await prisma.user.findMany();
};

export const getUsersWithLocations = async (): Promise<UserWithLocation[]> => {
  return await prisma.user.findMany({include: {location: true}});
}

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
