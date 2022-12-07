import { prismaClient as prisma } from '..';
import seedLocations from './locations';
import seedUsers from './users';
import seedGroups from './groups';
import seedGameTypes from './gameTypes';
import seedTeams from './teams';
import seedGameResults from './gameResults';
import seedGameRequirements from './gameRequirements';
import seedPlayerElos from './playerElos';

const isProduction = process.env.NODE_ENV === 'production';

async function main() {
  const locations = await seedLocations(prisma);

  const gameTypes = await seedGameTypes(prisma, { locations });
  await seedGameRequirements(prisma, { gameTypes });

  // Everything here is test data for development sake, not data required to run the app.
  if (!isProduction) {
    const users = await seedUsers(prisma, { locations });

    await seedPlayerElos(prisma, { users, gameTypes });

    await seedGroups(prisma, { users });

    // Seed teams - each player in their own team
    const teams = await seedTeams(prisma, { users });

    await seedGameResults(prisma, {
      locations,
      gameTypes,
      teams,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
