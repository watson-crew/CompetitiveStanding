import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@src/store/reducers';
import { Match } from '@src/types/games';

export type MatchState = {
  matchInProgress?: Match;
};

const initialState: MatchState = {
  matchInProgress: undefined,
};

export const matchSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    setMatchInProgress: (state, { payload }: PayloadAction<Match>) => {
      state.matchInProgress = payload;
    },
    clearMatchInProgress: state => {
      state.matchInProgress = undefined;
    },
  },
});

export const { setMatchInProgress, clearMatchInProgress } = matchSlice.actions;

export default matchSlice.reducer;

export const selectMatchInProgress = (state: RootState) => {
  return state.matches.matchInProgress;
};
