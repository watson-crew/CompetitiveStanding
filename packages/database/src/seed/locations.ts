import { Location, PrismaClient } from '@prisma/client';

const locations: Omit<Location, 'id'>[] = [
  {
    name: 'Nottingham',
  },
];

function seedLocations(prisma: PrismaClient): Record<string, Location> {
  const seededLocations: Record<string, Location> = {};

  locations.forEach(async (location, index) => {
    const insertedLocation = await prisma.location.upsert({
      where: {
        id: index + 1,
      },
      update: {},
      create: location,
    });

    seededLocations[insertedLocation.name.toLowerCase()] = insertedLocation;
  });

  return seededLocations;
}

export default seedLocations;
