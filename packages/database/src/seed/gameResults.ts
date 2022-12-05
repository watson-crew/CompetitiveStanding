import {
  GameResult,
  GameType,
  Prisma,
  PrismaClient,
  Team,
  Location,
} from '@prisma/client';
import dayjs from 'dayjs';

// Pass in all games types and all teams
// This seeder will create games of specific types for teams and output the results
type SeedDependencies = {
  locations: Record<string, Location>;
  gameTypes: Record<string, GameType>;
  teams: Record<string, Team>;
};

type Game = {
  teams: string[];
  winningTeam: string;
  start: Date;
  end: Date;
  gameType?: GameType;
};

const buildGameResults = ({ darts }: Record<string, GameType>): Game[] => {
  const now = dayjs();

  return [
    {
      teams: ['jjp', 'pjm'],
      winningTeam: 'jjp',
      start: now.subtract(325, 'seconds').toDate(),
      end: now.toDate(),
    },
    {
      teams: ['jjppjm', '4e8stctjw'],
      winningTeam: 'jjppjm',
      start: now.subtract(325, 'seconds').toDate(),
      end: now.toDate(),
    },
    {
      teams: ['jjp', 'pjm'],
      winningTeam: 'pjm',
      start: now.subtract(20, 'minutes').toDate(),
      end: now.subtract(15, 'minutes').toDate(),
    },
    {
      teams: ['jjp', 'pjm', 'stc'],
      winningTeam: 'pjm',
      start: now.subtract(30, 'minutes').toDate(),
      end: now.subtract(25, 'minutes').add(315, 'seconds').toDate(),
      gameType: darts,
    },
    {
      teams: ['stc', '4e8'],
      winningTeam: '4e8',
      start: now.subtract(2, 'hours').toDate(),
      end: now.subtract(2, 'hours').add(472, 'seconds').toDate(),
    },
    {
      teams: ['jjp', 'stc'],
      winningTeam: 'stc',
      start: now.subtract(2, 'days').toDate(),
      end: now.subtract(2, 'days').add(123, 'seconds').toDate(),
    },
    {
      teams: ['jjp', '4e8'],
      winningTeam: '4e8',
      start: now.subtract(10, 'days').toDate(),
      end: now.subtract(10, 'days').add(623, 'seconds').toDate(),
    },
  ];
};

const generateGameResultData = (
  location: Location,
  gameType: GameType,
  teams: Team[],
  winningTeam: Team,
  start: Date,
  end: Date,
): Omit<Prisma.GameResultUncheckedCreateInput, 'id'> => {
  return {
    teams: {
      connect: teams.map(
        ({ cumulativeTeamId }) =>
          ({ cumulativeTeamId } as Prisma.TeamWhereUniqueInput),
      ),
    },
    winningTeamId: winningTeam.cumulativeTeamId,
    gameTypeId: gameType.id,
    locationPlayedId: location.id,
    startTime: start,
    endTime: end,
  };
};

const gameResults = (
  locations: Record<string, Location>,
  gameTypes: Record<string, GameType>,
  teams: Record<string, Team>,
): Omit<Prisma.GameResultUncheckedCreateInput, 'id'>[] => {
  const { nottingham } = locations;
  const { pool } = gameTypes;

  const results: Omit<Prisma.GameResultUncheckedCreateInput, 'id'>[] = [];
  buildGameResults(gameTypes).forEach(game => {
    const teamsInGame: Team[] = game.teams.map(teamId => teams[teamId]);
    results.push(
      generateGameResultData(
        nottingham,
        game.gameType || pool,
        teamsInGame,
        teams[game.winningTeam],
        game.start,
        game.end,
      ),
    );
  });

  return results;
};

async function seedGameResults(
  prisma: PrismaClient,
  { locations, gameTypes, teams }: SeedDependencies,
): Promise<Record<string, GameResult>> {
  const seededGameResults: Record<string, GameResult> = {};

  const results = await gameResults(locations, gameTypes, teams);

  for (let i = 0; i < results.length; i++) {
    const insertedResult = await prisma.gameResult.upsert({
      where: {
        id: i + 1,
      },
      update: {},
      create: results[i],
    });

    seededGameResults[insertedResult.id] = insertedResult;
  }

  return seededGameResults;
}

export default seedGameResults;
