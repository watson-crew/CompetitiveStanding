import {
  GameResult,
  GameType,
  Prisma,
  PrismaClient,
  Team,
  Location,
} from '@prisma/client';
import { toId } from './maps';

// Pass in all games types and all teams
// This seeder will create games of specific types for teams and output the results
type SeedDependencies = {
  locations: Record<string, Location>;
  gameTypes: Record<string, GameType>;
  teams: Record<string, Team>;
};

type Game = {
  teams: number[];
  winningTeam: number;
};

const games: Game[] = [
  {
    teams: [1, 2],
    winningTeam: 1,
  },
  {
    teams: [1, 2],
    winningTeam: 2,
  },
  {
    teams: [3, 5],
    winningTeam: 5,
  },
];

const generateGameResultData = (
  location: Location,
  gameType: GameType,
  teams: Team[],
  winningTeam: Team,
): Omit<Prisma.GameResultUncheckedCreateInput, 'id'> => {
  return {
    teams: {
      connect: teams.map(toId),
    },
    winningTeamId: winningTeam.id,
    gameTypeId: gameType.id,
    locationPlayedId: location.id,
    startTime: '', // TODO: Generate start and end times
    endTime: ''
  };
};

const gameResults = (
  locations: Record<string, Location>,
  gameTypes: Record<string, GameType>,
  teams: Record<string, Team>,
): Omit<Prisma.GameResultUncheckedCreateInput, 'id'>[] => {
  const nottingham = locations['nottingham'];
  const pool = gameTypes['pool'];

  const results: Omit<Prisma.GameResultUncheckedCreateInput, 'id'>[] = [];
  games.forEach(game => {
    const teamsInGame: Team[] = game.teams.map(teamId => teams[teamId]);
    results.push(
      generateGameResultData(
        nottingham,
        pool,
        teamsInGame,
        teams[game.winningTeam],
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
