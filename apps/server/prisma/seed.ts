import { prisma } from "../lib/prisma";

async function main () {
    const jjp = await prisma.user.upsert({
        where: { memorableId: 'jjp' },
        update: {},
        create: {
            firstName: 'Josh',
            lastName: 'Paveley',
            memorableId: 'jjp',
            profilePicture:
            'https://ca.slack-edge.com/T0KNVDB9Q-UMRQJD1HB-3ff344af0ee4-512',
        }
    })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
