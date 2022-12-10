import { GameType, Location, TeamHistoricResult } from 'schema';
import { LoadingPlayer, TeamWithRatings } from 'ui';

export type GameTeam = LoadingPlayer[];

export type Match = {
  matchId: number;
  location: Location;
  gameType: GameType;
  participatingTeams: ParticipatingTeam[];
};

export type ParticipatingTeam = TeamWithRatings & {
  historicResults: TeamHistoricResult;
};
