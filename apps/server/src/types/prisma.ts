import {
  GameResult,
  GameType,
  Prisma,
  User,
  Location,
  GameRequirement,
  Team,
} from 'database';

export type GetTeamRankingsResult = {
  players: {
    memorableId: string;
    ranking: {
      elo: number;
    }[];
  }[];
};

export type GetResultsForLocationResult = GameResult & {
  gameType: GameType;
  winningTeam: {
    cumulativeTeamId: string;
  };
  locationPlayed: {
    name: string;
  };
  teams: {
    cumulativeTeamId: string;
    players: User[];
  }[];
};

export type GetRankingsForLocationAndGameTypeResult = User & {
  gamesPlayed: number;
  gamesWon: number;
};

export type GameTypeWithRequirements = GameType & {
  requirements: GameRequirement;
};

export type GetLocationResult = Location & {
  availableGames: GameTypeWithRequirements[];
  users: {
    _count: Prisma.UserCountOutputType;
  }[];
};
