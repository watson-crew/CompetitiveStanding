import { GameType, Location } from '@src/../../../packages/schema';
import { LoadingPlayer, TeamWithRatings } from 'ui';

export type GameTeam = LoadingPlayer[];

export type Match = {
  matchId: number;
  location: Location;
  gameType: GameType;
  participatingTeams: TeamWithRatings[];
};
