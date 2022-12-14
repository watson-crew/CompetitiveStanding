import { GameType, Prisma, PrismaClient, Location } from '@prisma/client';

type SeedDependencies = {
  locations: Record<string, Location>;
};

const generateGameTypes = (
  locations: Record<string, Location>,
): Prisma.GameTypeCreateInput[] => {
  const { birmingham, london, leeds, manchester, nottingham } = locations;

  return [
    {
      name: 'Pool',
      locations: {
        connect: [
          { id: nottingham.id },
          { id: leeds.id },
          { id: manchester.id },
          { id: birmingham.id },
        ],
      },
    },
    {
      name: 'Darts',
      locations: {
        connect: [{ id: nottingham.id }],
      },
    },
    {
      name: 'Table Tennis',
      locations: {
        connect: [{ id: london.id }],
      },
    },
  ];
};

async function seedGameTypes(
  prisma: PrismaClient,
  { locations }: SeedDependencies,
): Promise<Record<string, GameType>> {
  const seededGameTypes: Record<string, GameType> = {};

  const gameTypes = generateGameTypes(locations);
  for (let i = 0; i < gameTypes.length; i++) {
    const insertedGameType = await prisma.gameType.upsert({
      where: {
        id: i + 1,
      },
      update: {},
      create: gameTypes[i],
    });

    seededGameTypes[insertedGameType.name.toLowerCase()] = insertedGameType;
  }

  return seededGameTypes;
}

export default seedGameTypes;
