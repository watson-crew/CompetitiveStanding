import { prisma } from 'database';
import { User } from 'schema';
import { mapUserWithLocation, mapUser } from '../mappers/userMapper';

export const getUsers = async () => {
  return await prisma.user.findMany();
};

// TODO: Add types for UserWithLocation, User (without location) etc.
export const getUserByMemorableId = async (id: string): Promise<User> => {
  console.log('CLient');
  console.log(prisma);
  console.log('Done');

  const user = await prisma.user.findFirst({
    where: {
      memorableId: id,
    },
    include: {
      location: true,
    },
  });

  console.log(user);

  if (!user) {
    return null;
  }

  return mapUserWithLocation(user);
};

// TODO: Sort out mappings between prisma models and schema models
//       Including different models for get/create
export const createUser = async (user: any): Promise<User> => {
  const insertedUser = await prisma.user.create({
    data: {
      firstName: user.firstName,
      lastName: user.lastName,
      memorableId: user.memorableId,
      locationId: user.homeLocationId,
      profilePicture: user.profilePictureUrl
    }
  });

  return mapUser(insertedUser)
}
