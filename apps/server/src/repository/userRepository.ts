import { prismaClient as prisma, PrismaTypes, UserWithRelations } from 'database';
import { User as UserDto, UserInput as UserInputDto } from 'schema';
import { UserGetMapper, UserCreateMapper } from '../mappers/userMapper';

export const getUsers = async () => {
  return await prisma.user.findMany();
};

// Could declare types like this and be more explicit with our functions
type UsersWithLocations = PrismaTypes.PromiseReturnType<typeof getUsersWithLocations>
export const getUsersWithLocations = async () => {
  return await prisma.user.findMany({include: {location: true}});
}

// TODO: Add types for UserWithLocation, User (without location) etc.
export const getUserByMemorableId = async (id: string): Promise<UserDto> => {
  const user: UserWithRelations = await prisma.user.findFirst({
    where: {
      memorableId: id,
    },
    include: {
      location: true,
    },
  }) as UserWithRelations;

  console.log(user);

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
