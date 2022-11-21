import { Location } from '@prisma/client';
import { prisma } from '..';
import seedLocations from './locations';
import seedUsers from './users';

async function main() {
  // Seed locations
  const locations = await seedLocations(prisma);

  // Seed users
  await seedUsers(prisma, { locations });
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
