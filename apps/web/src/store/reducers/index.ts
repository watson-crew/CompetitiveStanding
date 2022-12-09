import { combineReducers } from '@reduxjs/toolkit';
import playerReducer from './playerSlice';
import locationReducer from './locationSlice';

export const rootReducer = combineReducers({
  players: playerReducer,
  locations: locationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
