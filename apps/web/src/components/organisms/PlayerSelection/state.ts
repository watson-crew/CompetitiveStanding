import {
  defaultIfEmpty,
  filterFalsey,
  withIndexReplaced,
} from '@src/uilts/collectionUtils';
import { GameRequirement, User } from 'schema';
import { LoadingPlayer } from 'ui';

export enum TeamActionType {
  PlayerDetailsAdded,
  PlayerRemoved,
  PlayerLoading,
  PlayerResolved,
  SlotAdded,
  AddTeam,
}

type TeamActionPayload = {
  teamIndex?: number;
  player?: User;
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

      const withSlotAddded: LoadingPlayer[] = [
        ...state[teamIndex],
        PlayerFactory.createSlot(),
      ];

      return withIndexReplaced(state, withSlotAddded, teamIndex);
    }
    case TeamActionType.AddTeam: {
      return [...state, [PlayerFactory.createSlot()]];
    }
    default:
      return state;
  }
}
