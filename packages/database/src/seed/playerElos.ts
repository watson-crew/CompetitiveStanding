import { GameType, PrismaClient, User } from '@prisma/client';

const baseElo = 1200;

type SeedDependencies = {
  users: Record<string, User>;
  gameTypes: Record<number, GameType>;
};

async function seedPlayerElos(
  prisma: PrismaClient,
  { users, gameTypes }: SeedDependencies,
): Promise<void> {
  let id = 1;

  const allUsers = Object.values(users);
  const allGameTypes = Object.values(gameTypes);

  for (let i = 0; i < allUsers.length; i++) {
    const player = allUsers[i];

    for (let j = 0; j < allGameTypes.length; j++) {
      const gameType = allGameTypes[j];

      await prisma.playerRanking.upsert({
        where: {
          id: id,
        },
        create: {
          elo: baseElo,
          gameTypeId: gameType.id,
          userMemorableId: player.memorableId,
        },
        update: {},
      });

      id++;
    }
  }
}

export default seedPlayerElos;
