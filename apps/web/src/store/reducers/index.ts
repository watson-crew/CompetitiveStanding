import { combineReducers } from '@reduxjs/toolkit';
import playerReducer from './playerSlice';
import matchReducer from './matchSlice';

export const rootReducer = combineReducers({
  players: playerReducer,
  matches: matchReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
