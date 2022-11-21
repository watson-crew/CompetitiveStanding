import { Group, User, PrismaClient, Prisma } from '@prisma/client';

const t: Prisma.GroupCreateInput = {
  name: 'watson',
  groupPicture: '',
  players: {connect: []}
}

const groups: Omit<Group, "id">[] = [
  {
    name: 'Watson Crew',
    groupPicture:
      'http://proici.co.uk/wp-content/uploads/2018/12/BJSS_Header.jpg',
  },
  {
    name: 'Bench Group',
    groupPicture:
      'http://proici.co.uk/wp-content/uploads/2018/12/BJSS_Header.jpg',
  }
];

async function seedGroups(
  prisma: PrismaClient,
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

  return seededGroups;
}

export default seedGroups;
