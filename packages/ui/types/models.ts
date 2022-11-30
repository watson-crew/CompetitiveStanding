import { Team, User } from 'schema';
import { Dayjs } from 'dayjs';
import { WithLoadingProps } from './react';

export type GameResult = {
  teams: Omit<Team, 'id'>[];
  winningTeamId: string;
  startTime: Dayjs;
  endTime: Dayjs;
  location: string;
};

export type LoadingPlayer = WithLoadingProps<{
  playerDetails?: User;
}>;
