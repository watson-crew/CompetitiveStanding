import { GameRequirement } from '@src/types/games';
import {
  defaultIfEmpty,
  filterFalsey,
  withIndexReplaced,
} from '@src/uilts/collectionUtils';
import { User } from 'schema';
import { LoadingPlayer } from 'ui';

export enum TeamActionType {
  PlayerDetailsAdded,
  PlayerRemoved,
  PlayerLoading,
  PlayerResolved,
  SlotAdded,
  AddTeam,
  ApplyTeamCap,
  ApplyPlayerCap,
}

type TeamActionPayload = {
  teamIndex?: number;
  player?: User;
  maxNumberOfTeams?: number;
  maxNumberOfPlayers?: number;
};

export type TeamAction = {
  actionType: TeamActionType;
  payload?: TeamActionPayload;
};

export type TeamState = LoadingPlayer[][];

const PlayerFactory = {
  createSlot: (): LoadingPlayer => ({ loading: false }),
  createLoading: (): LoadingPlayer => ({ loading: true }),
  createLoaded: (playerDetails: User): LoadingPlayer => ({
    loading: false,
    playerDetails,
  }),
};

export function createInitialState({
  numberOfTeams,
  playersPerTeam,
}: GameRequirement): TeamState {
  const initialState: LoadingPlayer[][] = [];

  for (let i = 0; i < numberOfTeams; i++) {
    const team: LoadingPlayer[] = [];

    for (let j = 0; j < playersPerTeam; j++) {
      team.push(PlayerFactory.createSlot());
    }

    initialState.push(team);
  }

  return initialState;
}

const getPlayer = (payload?: TeamActionPayload): User => {
  if (payload && payload.player) {
    return payload.player;
  }
  throw Error();
};

const getTeamIndex = (payload?: TeamActionPayload): number => {
  if (payload && payload.teamIndex !== undefined) {
    return payload.teamIndex;
  }
  throw Error();
};

const getMaxNumberOfPlayers = (payload?: TeamActionPayload): number => {
  if (payload && payload.maxNumberOfPlayers !== undefined) {
    return payload.maxNumberOfPlayers;
  }
  throw Error();
};

const getMaxNumberOfTeams = (payload?: TeamActionPayload): number => {
  if (payload && payload.maxNumberOfTeams !== undefined) {
    return payload.maxNumberOfTeams;
  }
  throw Error();
};

export function teamsReducer(
  state: TeamState,
  { actionType, payload }: TeamAction,
): TeamState {
  switch (actionType) {
    case TeamActionType.PlayerDetailsAdded: {
      const player = getPlayer(payload);
      const teamIndex = getTeamIndex(payload);

      return withIndexReplaced(
        state,
        [
          ...filterFalsey(state[teamIndex], 'playerDetails'),
          PlayerFactory.createLoaded(player),
        ],
        teamIndex,
      );
    }

    case TeamActionType.PlayerLoading: {
      const teamIndex = getTeamIndex(payload);

      return withIndexReplaced(
        state,
        [...state[teamIndex].slice(0, -1), PlayerFactory.createLoading()],
        teamIndex,
      );
    }
    case TeamActionType.PlayerResolved: {
      const teamIndex = getTeamIndex(payload);

      return withIndexReplaced(
        state,
        [...state[teamIndex].slice(0, -1), { loading: false }],
        teamIndex,
      );
    }
    case TeamActionType.PlayerRemoved: {
      const teamIndex = getTeamIndex(payload);
      const player = getPlayer(payload);

      const withPlayerRemoved = state[teamIndex].filter(
        ({ playerDetails }) =>
          playerDetails?.memorableId !== player.memorableId,
      );

      return withIndexReplaced(
        state,
        defaultIfEmpty(withPlayerRemoved, { loading: false }),
        teamIndex,
      );
    }
    case TeamActionType.SlotAdded: {
      const teamIndex = getTeamIndex(payload);

      const withSlotAdded: LoadingPlayer[] = [
        ...state[teamIndex],
        PlayerFactory.createSlot(),
      ];

      return withIndexReplaced(state, withSlotAdded, teamIndex);
    }
    case TeamActionType.AddTeam: {
      return [...state, [PlayerFactory.createSlot()]];
    }
    case TeamActionType.ApplyTeamCap: {
      const maxNumberOfPlayers = getMaxNumberOfPlayers(payload);
      const maxNumberOfTeams = getMaxNumberOfTeams(payload);

      state = [...state]
        .slice(0, maxNumberOfTeams)
        .map(team => team.slice(0, maxNumberOfPlayers));

      return state;
    }
    default:
      return state;
  }
}
