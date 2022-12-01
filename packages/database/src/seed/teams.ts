import { Team, User, PrismaClient, Prisma } from '@prisma/client';
import { toId } from './maps';

type SeedDependencies = {
  users: Record<string, User>;
};

const usersToCumulativeId = (users: User[]): string => {
  const usersSortedAlphabetically = users.sort((a, b) =>
    a.memorableId.localeCompare(b.memorableId),
  );

  return usersSortedAlphabetically.reduce(
    (acc, currentUser) => acc + currentUser.memorableId,
    '',
  );
};

const userToTeam = (user: User): Prisma.TeamCreateInput => usersToTeam([user]);

const usersToTeam = (users: User[]): Prisma.TeamCreateInput => {
  return {
    cumulativeTeamId: usersToCumulativeId(users),
    players: {
      connect: users.map(toId),
    },
  };
};

async function seedTeams(
  prisma: PrismaClient,
  { users }: SeedDependencies,
): Promise<Record<string, Team>> {
  const seededTeams: Record<string, Team> = {};

  // Each user in their own team for 1v1 games
  const teamsData = Object.values(users).map(userToTeam);

  for (let i = 0; i < teamsData.length; i++) {
    const insertedTeam = await prisma.team.upsert({
      where: {
        id: i + 1,
      },
      update: {},
      create: teamsData[i],
    });

    seededTeams[insertedTeam.id] = insertedTeam;
  }

  return seededTeams;
}

export default seedTeams;
