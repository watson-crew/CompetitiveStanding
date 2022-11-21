import { Location, PrismaClient } from '@prisma/client';

const locations: Omit<Location, 'id'>[] = [
  {
    name: 'Nottingham',
    urlPath: 'nottingham',
    coverPhoto:
      'http://proici.co.uk/wp-content/uploads/2018/12/BJSS_Header.jpg',
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
