import { Location, PrismaClient, User } from '@prisma/client';

type SeedDependencies = {
  locations: Record<string, Location>;
};

const users = (locations: Record<string, Location>): Omit<User, 'id'>[] => {
  const nottingham = locations['nottingham'];

  return [
    {
      firstName: 'Josh',
      lastName: 'Paveley',
      memorableId: 'jjp',
      profilePicture:
        'https://ca.slack-edge.com/T0KNVDB9Q-UMRQJD1HB-3ff344af0ee4-512',
      locationId: nottingham.id,
    },
    {
      firstName: 'Pierce',
      lastName: 'Morris',
      memorableId: 'pjm',
      profilePicture:
        'https://ca.slack-edge.com/T0KNVDB9Q-U016MJ6L014-0dfb1c282417-192',
      locationId: nottingham.id,
    },
    {
      firstName: 'Stephen',
      lastName: 'Church',
      memorableId: 'stc',
      locationId: nottingham.id,
      profilePicture: null,
    },
    {
      firstName: 'Tom',
      lastName: 'Webb',
      memorableId: 'tjw',
      profilePicture:
        'https://ca.slack-edge.com/T0KNVDB9Q-U0176UQC2BT-f5c3f8a1f990-72',
      locationId: nottingham.id,
    },
    {
      firstName: 'Fabian',
      lastName: 'McGibbon',
      memorableId: '4e8',
      profilePicture:
        'https://ca.slack-edge.com/T0KNVDB9Q-U028KHZUF1C-2f7eb72c227f-512',
      locationId: nottingham.id,
    },
    {
      firstName: 'Ruairidh',
      lastName: 'Taylor',
      memorableId: 'rua',
      profilePicture:
        'https://ca.slack-edge.com/T0KNVDB9Q-U03FHDHDXV3-cab7a2f87fff-48',
      locationId: nottingham.id,
    },
  ];
};

async function seedUsers(
  prisma: PrismaClient,
  { locations }: SeedDependencies,
): Promise<Record<string, User>> {
  const seededUsers: Record<string, User> = {};

  for (const user of users(locations)) {
    const insertedUser = await prisma.user.upsert({
      where: { memorableId: user.memorableId },
      update: {},
      create: user,
    });

    seededUsers[insertedUser.memorableId] = insertedUser;
  }

  return seededUsers;
}

export default seedUsers;
