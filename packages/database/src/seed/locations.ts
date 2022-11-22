import { Location, Prisma, PrismaClient } from '@prisma/client';

const locations: Omit<Location, 'id'>[] = [
  {
    name: 'Nottingham',
    urlPath: 'nottingham',
    coverPhoto:
      'http://proici.co.uk/wp-content/uploads/2018/12/BJSS_Header.jpg',
  },
];

// // Generic function for seeding an array of data for a prisma model
// async function seedData<T>(
//   prisma: PrismaClient,
//   data: T[]
// ): Promise<Record<string, T>> {
//   const seededData: Record<string, T> = {}

//   for (let i = 0; i < data.length; i++) {
//     const insertedData = await prisma.location.upsert({
//       where: {
//         id: i + 1,
//       },
//       update: {},
//       create: data[i],
//     });

//     // TODO: Configure this, for Users we want memorableId, for location and group we want name
//     //       For team and gameResults we may want id
//     seededData[insertedData.name.toLowerCase()] = insertedData;
//   }

//   return seededData;
// }

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
