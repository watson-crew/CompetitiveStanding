import { GameResult, User } from 'database';

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