import { LoadingPlayer } from 'ui';

export enum TeamActionType {
  PlayerAdded,
  PlayerRemoved,
  PlayerLoading,
}

export type TeamAction = {
  action: TeamActionType;
  value: string;
};

export type TeamState = {
  teams: LoadingPlayer[][];
};

export function teamsReducer(state: TeamState, action: TeamAction): TeamState {
  switch (action.action) {
    case TeamActionType.PlayerAdded:
      return { teams: [] };
    case TeamActionType.PlayerLoading:
      return { teams: [] };
    case TeamActionType.PlayerRemoved:
      return { teams: [] };
    default:
      return state;
  }
}
