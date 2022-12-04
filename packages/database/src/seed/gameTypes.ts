import { GameType, Prisma, PrismaClient, Location } from '@prisma/client';

type SeedDependencies = {
  locations: Record<string, Location>;
};

const generateGameTypes = (
  locations: Record<string, Location>,
): Prisma.GameTypeCreateInput[] => {
  const { nottingham, london, leeds, manchester, birmingham } = locations;

  return [
    {
      name: 'Pool',
      requirements: {
        create: {
          minPlayersPerTeam: 1,
          minNumberOfTeams: 2,
          maxNumberOfTeams: 2,
          maxPlayersPerTeam: 4,
        },
      },
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
      requirements: {
        create: {
          minPlayersPerTeam: 1,
          minNumberOfTeams: 2,
          maxNumberOfTeams: 6,
          maxPlayersPerTeam: 6,
        },
      },
      locations: {
        connect: [{ id: nottingham.id }],
      },
    },
    {
      name: 'Table Tennis',
      requirements: {
        create: {
          minPlayersPerTeam: 1,
          minNumberOfTeams: 2,
          maxNumberOfTeams: 2,
          maxPlayersPerTeam: 2,
        },
      },
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
