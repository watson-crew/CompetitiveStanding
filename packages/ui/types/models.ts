import { GameType, Team, TeamHistoricResult, User } from 'schema';
import { Dayjs } from 'dayjs';
import { WithLoadingProps } from './react';

export type PlayerWithRating = User & {
  elo?: number;
  eloChange?: number;
};

export type TeamWithRatings = Omit<Team, 'players'> & {
  players: PlayerWithRating[];
  historicResults: TeamHistoricResult;
};

export type GameResult = {
  teams: TeamWithRatings[];
  gameType: GameType;
  winningTeamId: string;
  startTime: Dayjs;
  endTime: Dayjs;
  location: string;
};

export type LoadingPlayer = WithLoadingProps<{
  playerDetails?: User;
}>;
