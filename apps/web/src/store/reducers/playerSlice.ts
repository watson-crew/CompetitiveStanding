import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'schema'
import { RootState } from '@src/store/reducers'

export type PlayerState = {
    recentlyPlayed: User[]
}

// Initial state can be a "lazy initializer" to load from localStorage (https://redux-toolkit.js.org/api/createslice#initialstate)
const initialState: PlayerState = {
    recentlyPlayed: []
}

export const playerSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        addRecentlyPlayed: (state, action: PayloadAction<User>) => {
            state.recentlyPlayed.push(action.payload)
        },
    }
})

export const { addRecentlyPlayed } = playerSlice.actions

export default playerSlice.reducer

// SELECTORS: Rely on RootState
export const selectRecentlyPlayed = (state: RootState) => {
    return state.players.recentlyPlayed
}
