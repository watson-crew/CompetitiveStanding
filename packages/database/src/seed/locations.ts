import { Location, PrismaClient } from '@prisma/client';

const locations: Omit<Location, 'id'>[] = [
  {
    name: 'Nottingham',
    urlPath: 'nottingham',
  },
  {
    name: 'Leeds',
    urlPath: 'leeds',
  },
  {
    name: 'Manchester',
    urlPath: 'manchester',
  },
  {
    name: 'London',
    urlPath: 'london',
  },
  {
    name: 'Birmingham',
    urlPath: 'birmingham',
  },
];

async function seedLocations(
  prisma: PrismaClient,
): Promise<Record<string, Location>> {
  const seededLocations: Record<string, Location> = {};

  for (let i = 0; i < locations.length; i++) {
    const insertedLocation = await prisma.location.upsert({
      where: {
        id: i + 1,
      },
      update: {},
      create: locations[i],
    });

    seededLocations[insertedLocation.name.toLowerCase()] = insertedLocation;
  }

  return seededLocations;
}

export default seedLocations;
