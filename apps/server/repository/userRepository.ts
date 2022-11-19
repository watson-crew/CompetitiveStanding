import prismaClient from '.';
import { User } from 'schema';
import { mapUserWithLocation } from '../mappers/userMapper';

export const getUsers = async () => {
  return await prismaClient.user.findMany();
};

export const getUserByMemorableId = async (id: string): Promise<User> => {
  console.log('CLient');
  console.log(prismaClient);
  console.log('Done');

  const user = await prismaClient.user.findFirst({
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
