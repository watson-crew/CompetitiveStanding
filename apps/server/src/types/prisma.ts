import { GameResult, User, Team } from 'database';

export type GetResultsForLocationResult = GameResult & {
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
  gamesPlayed: number,
  gamesWon: number
};
