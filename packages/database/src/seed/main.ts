import { Location } from '@prisma/client';
import { prisma } from '..';
import seedLocations from './locations';
import seedUsers from './users';
import seedGroups from './groups';
import seedGameTypes from './gameTypes';
import seedTeams from './teams';
import seedGameResults from './gameResults';

async function main() {
  // Seed locations
  const locations = await seedLocations(prisma);

  // Seed users
  const users = await seedUsers(prisma, { locations });

  // Seed game types
  const gameTypes = await seedGameTypes(prisma);

  // Seed groups
  const groups = await seedGroups(prisma, { users });

  // Seed teams - each player in their own team
  const teams = await seedTeams(prisma, { users });

  // Seed game results
  const gameResults = await seedGameResults(prisma, { locations, gameTypes, teams });
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
