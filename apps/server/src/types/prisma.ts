import {
  GameResult,
  GameType,
  Prisma,
  User,
  Location,
  GameRequirement,
} from 'database';

export type GetPlayerRatingResult = {
  playerRanking: {
    player: {
      memorableId: string;
    };
  };
  ratingChangeAmount: number;
};

export type PlayerRankingResult = {
  id: number;
  userMemorableId: string;
  elo: number;
};

export type GetTeamRankingsResult = GetTeamPlayerRankingsResult & {
  cumulativeTeamId: string;
};

export type GetTeamPlayerRankingsResult = {
  players: {
    memorableId: string;
    rankings: {
      id: number;
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
  ratingChanges: {
    ratingChangeAmount: number;
    playerRanking: {
      player: {
        memorableId: string;
      };
    };
  }[];
};

export type GetRankingsForLocationAndGameTypeResult = User & {
  gamesPlayed: number;
  gamesWon: number;
  winPercentage: number;
  elo: number;
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
