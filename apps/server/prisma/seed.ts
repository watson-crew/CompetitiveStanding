import { prisma } from '../lib/prisma';

async function main() {
  await prisma.user.upsert({
    where: { memorableId: 'jjp' },
    update: {},
    create: {
      firstName: 'Josh',
      lastName: 'Paveley',
      memorableId: 'jjp',
      profilePicture:
        'https://ca.slack-edge.com/T0KNVDB9Q-UMRQJD1HB-3ff344af0ee4-512',
      location: {
        create: {
          name: 'Nottingham',
        },
      },
    },
  });

  await prisma.user.upsert({
    where: { memorableId: 'pjm' },
    update: {},
    create: {
      firstName: 'Pierce',
      lastName: 'Morris',
      memorableId: 'pjm',
      profilePicture:
        'https://ca.slack-edge.com/T0KNVDB9Q-U016MJ6L014-0dfb1c282417-192',
      location: {
        create: {
          name: 'Nottingham',
        },
      },
    },
  });

  await prisma.user.upsert({
    where: { memorableId: 'stc' },
    update: {},
    create: {
      firstName: 'Stephen',
      lastName: 'Church',
      memorableId: 'stc',
      location: {
        create: {
          name: 'Nottingham',
        },
      },
    },
  });

  await prisma.user.upsert({
    where: { memorableId: 'ad2' },
    update: {},
    create: {
      firstName: 'Tom',
      lastName: 'Webb',
      memorableId: 'ad2',
      profilePicture:
        'https://ca.slack-edge.com/T0KNVDB9Q-U0176UQC2BT-f5c3f8a1f990-72',
      location: {
        create: {
          name: 'Nottingham',
        },
      },
    },
  });

  await prisma.user.upsert({
    where: { memorableId: '4e8' },
    update: {},
    create: {
      firstName: 'Fabian',
      lastName: 'McGibbon',
      memorableId: '4e8',
      profilePicture:
        'https://ca.slack-edge.com/T0KNVDB9Q-U028KHZUF1C-2f7eb72c227f-512',
      location: {
        create: {
          name: 'Nottingham',
        },
      },
    },
  });
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
