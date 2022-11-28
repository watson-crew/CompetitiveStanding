import { Group, User, PrismaClient, Prisma } from '@prisma/client';
import { toId } from './maps';

type SeedDependencies = {
  users: Record<string, User>;
};

const groups: Omit<Group, 'id'>[] = [
  {
    name: 'Watson Crew',
    groupPicture:
      'http://proici.co.uk/wp-content/uploads/2018/12/BJSS_Header.jpg',
  },
  {
    name: 'Bench Group',
    groupPicture:
      'http://proici.co.uk/wp-content/uploads/2018/12/BJSS_Header.jpg',
  },
];

async function addUsersToGroup(
  prisma: PrismaClient,
  group: Group,
  users: User[],
): Promise<Group> {
  const data: Prisma.GroupUpdateInput = {
    players: {
      connect: users.map(toId),
    },
  };

  const updatedGroup = await prisma.group.update({
    where: { id: group.id },
    data,
  });
  return updatedGroup;
}

async function seedGroups(
  prisma: PrismaClient,
  { users }: SeedDependencies,
): Promise<Record<string, Group>> {
  const seededGroups: Record<string, Group> = {};

  for (let i = 0; i < groups.length; i++) {
    const insertedGroup = await prisma.group.upsert({
      where: {
        id: i + 1,
      },
      update: {},
      create: groups[i],
    });

    seededGroups[insertedGroup.name.toLowerCase()] = insertedGroup;
  }

  const watsonGroup = seededGroups['watson crew'];
  const watsonGroupPlayers = [
    users['jjp'],
    users['pjm'],
    users['stc'],
    users['tjw'],
    users['4e8'],
    users['rua'],
  ];
  await addUsersToGroup(prisma, watsonGroup, watsonGroupPlayers);
  seededGroups['watson crew'] = watsonGroup;

  return seededGroups;
}

export default seedGroups;
