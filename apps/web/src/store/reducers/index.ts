import { combineReducers } from "@reduxjs/toolkit";
import playerReducer from './playerSlice'

export const rootReducer = combineReducers({
    players: playerReducer
})

export type RootState = ReturnType<typeof rootReducer>