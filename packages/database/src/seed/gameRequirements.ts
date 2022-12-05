import { GameType, Prisma, PrismaClient } from '@prisma/client';

type SeedDependencies = {
  gameTypes: Record<string, GameType>;
};

const generateGameRequirements = (
  gameTypes: Record<string, GameType>,
): Prisma.GameRequirementCreateInput[] => {
  return [
    {
      minPlayersPerTeam: 1,
      minNumberOfTeams: 2,
      maxNumberOfTeams: 2,
      maxPlayersPerTeam: 2,
      gameType: {
        connect: { id: gameTypes['pool'].id },
      },
    },
    {
      minPlayersPerTeam: 1,
      minNumberOfTeams: 2,
      maxNumberOfTeams: 6,
      maxPlayersPerTeam: 6,
      gameType: {
        connect: { id: gameTypes['darts'].id },
      },
    },
    {
      minPlayersPerTeam: 1,
      minNumberOfTeams: 2,
      maxNumberOfTeams: 2,
      maxPlayersPerTeam: 2,
      gameType: {
        connect: { id: gameTypes['table tennis'].id },
      },
    },
  ];
};

async function seedGameRequirements(
  prisma: PrismaClient,
  { gameTypes }: SeedDependencies,
): Promise<void> {
  const gameRequirements = generateGameRequirements(gameTypes);
  for (let i = 0; i < gameRequirements.length; i++) {
    await prisma.gameRequirement.upsert({
      where: {
        id: i + 1,
      },
      update: {},
      create: gameRequirements[i],
    });
  }
}

export default seedGameRequirements;
