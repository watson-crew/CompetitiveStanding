import { LoadingPlayer } from 'ui';

export type GameRequirement = {
  playersPerTeam: number;
  numberOfTeams: number;
};

export type GameRequirements = {
  min: GameRequirement;
  max: GameRequirement;
};

export type GameTeam = LoadingPlayer[];
