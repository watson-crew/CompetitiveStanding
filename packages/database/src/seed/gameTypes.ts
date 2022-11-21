import { GameType, PrismaClient } from '@prisma/client';

const gameTypes: Omit<GameType, "id">[] = [
  {
    name: 'Pool',
    maxNumberOfTeams: 2
  }
];

async function seedGameTypes(
  prisma: PrismaClient,
): Promise<Record<string, GameType>> {
  const seededGameTypes: Record<string, GameType> = {};

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
