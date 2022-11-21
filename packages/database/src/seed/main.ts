import { Location } from '@prisma/client';
import { prisma } from '..';
import seedLocations from './locations';
import seedUsers from './users';
import seedGroups from './groups';
import seedGameTypes from './gameTypes';
import seedTeams from './teams';
import { addUsersToGroup } from './maps'

async function main() {
  // Seed locations
  const locations = await seedLocations(prisma);

  // Seed users
  const users = await seedUsers(prisma, { locations });

  // Seed game types
  const gameTypes = await seedGameTypes(prisma);

  // Seed groups
  const groups = await seedGroups(prisma);

  // Add players to groups - TODO: Move this into seedGroups for consistency
  const watsonGroup = groups['watson crew']
  const watsonGroupPlayers = [users['jjp'], users['pjm'], users['stc'], users['ad2'], users['4e8']]
  await addUsersToGroup(prisma, watsonGroup, watsonGroupPlayers);

  // Seed teams - each player in their own team
  const teams = await seedTeams(prisma, { users });
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
