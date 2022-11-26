import { Team } from 'schema';
import { Dayjs } from 'dayjs';

export type GameResult = {
  teams: Omit<Team, 'id'>[];
  winningTeamId: string;
  startTime: Dayjs;
  endTime: Dayjs;
  location: string;
};
