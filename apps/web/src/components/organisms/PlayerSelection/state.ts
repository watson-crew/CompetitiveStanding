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
}

export type TeamAction = {
  actionType: TeamActionType;
  payload?: {
    teamIndex?: number;
    player?: User;
  };
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

export function teamsReducer(
  state: TeamState,
  { actionType, payload }: TeamAction,
): TeamState {
  const player = payload!.player!;
  const teamIndex = payload!.teamIndex!;

  switch (actionType) {
    case TeamActionType.PlayerDetailsAdded:
      console.log(state);

      const foo = withIndexReplaced(
        state,
        [
          ...filterFalsey(state[teamIndex], 'playerDetails'),
          PlayerFactory.createLoaded(player),
        ],
        teamIndex,
      );

      console.log(foo);

      return foo;

    case TeamActionType.PlayerLoading:
      return withIndexReplaced(
        state,
        [...state[teamIndex].slice(0, -1), PlayerFactory.createLoading()],
        teamIndex,
      );

    case TeamActionType.PlayerResolved:
      return withIndexReplaced(
        state,
        [...state[teamIndex].slice(0, -1), { loading: false }],
        teamIndex,
      );

    case TeamActionType.PlayerRemoved:
      const withPlayerRemoved = state[teamIndex].filter(
        ({ playerDetails }) =>
          playerDetails?.memorableId !== player.memorableId,
      );

      return withIndexReplaced(
        state,
        defaultIfEmpty(withPlayerRemoved, { loading: false }),
        teamIndex,
      );

    case TeamActionType.SlotAdded:
      const withSlotAddded: LoadingPlayer[] = [
        ...state[teamIndex],
        PlayerFactory.createSlot(),
      ];

      return withIndexReplaced(state, withSlotAddded, teamIndex);

    case TeamActionType.AddTeam:
      return [...state, [PlayerFactory.createSlot()]];

    default:
      return state;
  }
}
