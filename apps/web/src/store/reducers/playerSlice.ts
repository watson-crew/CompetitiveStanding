import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'schema';
import { RootState } from '@src/store/reducers';

export type PlayerState = {
  recentlyPlayed: User[];
};

// Initial state can be a "lazy initializer" to load from localStorage (https://redux-toolkit.js.org/api/createslice#initialstate)
const initialState: PlayerState = {
  recentlyPlayed: [],
};

export const playerSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    addRecentlyPlayed: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      state.recentlyPlayed = state.recentlyPlayed.filter(u => u.id != user.id);
      state.recentlyPlayed.push(user);
    },
    clearRecentlyPlayed: state => {
      state.recentlyPlayed = [];
    },
  },
});

export const { addRecentlyPlayed, clearRecentlyPlayed } = playerSlice.actions;

export default playerSlice.reducer;

// SELECTORS: Rely on RootState
export const selectRecentlyPlayed = (state: RootState) => {
  return state.players.recentlyPlayed;
};
