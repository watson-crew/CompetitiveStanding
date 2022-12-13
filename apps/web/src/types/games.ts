import { Dayjs } from 'dayjs';
import { GameType, Location, RatingChanges, TeamHistoricResult } from 'schema';
import { LoadingPlayer, PlayerWithRating, TeamWithRatings } from 'ui';

export type GameTeam = LoadingPlayer[];

export type Match = {
  matchId: number;
  gameStartTime: Dayjs;
  location: Location;
  gameType: GameType;
  participatingTeams: ParticipatingTeam[];
};

export type ParticipatingTeam = TeamWithRatings & {
  historicResults: TeamHistoricResult;
  players: ParticipatingPlayer[];
};

export type ParticipatingPlayer = PlayerWithRating & {
  isStarting?: boolean;
};

export type FinishedGameResult = {
  winningTeam: ParticipatingTeam;
  ratingChanges: RatingChanges;
};
