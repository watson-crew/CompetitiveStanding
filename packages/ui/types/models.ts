import { GameType, Team, User } from 'schema';
import { Dayjs } from 'dayjs';
import { WithLoadingProps } from './react';

export type PlayerWithRating = User & {
  elo?: number;
};

export type TeamWithRatings = Omit<Team, 'players'> & {
  players: PlayerWithRating[];
};

export type PlayerWithRatingChanges = User & {
  eloChange?: number;
};

export type TeamWithRatingChanges = Omit<Team, 'players'> & {
  players: PlayerWithRatingChanges[];
};

export type GameResult = {
  teams: TeamWithRatingChanges[];
  gameType: GameType;
  winningTeamId: string;
  startTime: Dayjs;
  endTime: Dayjs;
  location: string;
};

export type LoadingPlayer = WithLoadingProps<{
  playerDetails?: User;
}>;
