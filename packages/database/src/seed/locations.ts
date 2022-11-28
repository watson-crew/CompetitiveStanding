import { Location, PrismaClient } from '@prisma/client';

const locations: Omit<Location, 'id'>[] = [
  {
    name: 'Nottingham',
    urlPath: 'nottingham',
    coverPhoto:
      'http://proici.co.uk/wp-content/uploads/2018/12/BJSS_Header.jpg',
  },
  {
    name: 'Leeds',
    urlPath: 'leeds',
    coverPhoto:
      'https://0a2f99e1222b3953ac58-e80a30755738c4b2c0e4ad59cfc2532a.ssl.cf3.rackcdn.com/xl_48_8193_636960094020980000.jpg',
  },
  {
    name: 'Manchester',
    urlPath: 'manchester',
    coverPhoto: 'https://pbs.twimg.com/media/ELCpG0xXkAAmJet.jpg',
  },
  ,
  {
    name: 'London',
    urlPath: 'london',
    coverPhoto:
      'https://nicheprojects.net/index.php/assets/Uploads/_resampled/ScaleHeightWyI5MDAiXQ/Bjss-023.jpg',
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
