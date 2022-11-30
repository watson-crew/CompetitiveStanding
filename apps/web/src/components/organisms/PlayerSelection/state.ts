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

export function createInitialState(
  minTeams: number,
  minPlayersPerTeam: number,
): TeamState {
  const initialState: LoadingPlayer[][] = [];

  for (let i = 0; i < minTeams; i++) {
    const team: LoadingPlayer[] = [];

    for (let j = 0; j < minPlayersPerTeam; j++) {
      team.push({ loading: false });
    }

    initialState.push(team);
  }

  return initialState;
}

function withEmptySlotsRemoved(arr: LoadingPlayer[]): LoadingPlayer[] {
  return arr.filter(slot => !!slot.playerDetails);
}

function withIndexReplaced(
  arr: LoadingPlayer[][],
  newValue: LoadingPlayer[],
  index: number,
) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function defaultIfEmpty<T>(arr: T[], defaultVal: T): T[] {
  return arr.length === 0 ? [defaultVal] : arr;
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
          ...withEmptySlotsRemoved(state[teamIndex]),
          { loading: false, playerDetails: player },
        ],
        teamIndex,
      );

      console.log(foo);

      return foo;

    case TeamActionType.PlayerLoading:
      return withIndexReplaced(
        state,
        [...state[teamIndex].slice(0, -1), { loading: true }],
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
        { loading: false },
      ];

      return withIndexReplaced(state, withSlotAddded, teamIndex);

    case TeamActionType.AddTeam:
      return [...state, [{ loading: false }]];

    default:
      return state;
  }
}
