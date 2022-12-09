import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Location } from 'schema';
import { RootState } from '@src/store/reducers';

export type LocationState = {
  availableLocations: Record<number, Location>;
};

// Initial state can be a "lazy initializer" to load from localStorage (https://redux-toolkit.js.org/api/createslice#initialstate)
const initialState: LocationState = {
  availableLocations: {},
};

const addLocationToState = (state: LocationState, location: Location) => {
  state.availableLocations[location.id] = location;
};

export const locationSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    addLocation: (state, { payload }: PayloadAction<Location>) =>
      addLocationToState(state, payload),
    addLocations: (state, { payload }: PayloadAction<Location[]>) => {
      payload.forEach(location => addLocationToState(state, location));
    },
    clearLocations: state => {
      state.availableLocations = {};
    },
  },
});

export const {
  addLocation,
  addLocations,
  clearLocations: clearRecentlyPlayed,
} = locationSlice.actions;

export default locationSlice.reducer;

// SELECTORS: Rely on RootState
export const selectRecentlyPlayed = (state: RootState) => {
  return state.players.recentlyPlayed;
};

// SELECTORS: Rely on RootState
export const selectLocation = (state: RootState, locationId: number) => {
  return state.locations.availableLocations[locationId];
};
