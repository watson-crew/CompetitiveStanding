import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { competitiveStandingApi } from '@src/stores/competitiveStandingApi'

// TODO: Change from createStore to configureStore as createStore is deprecated (but following guide for now)
export const store = configureStore({
    reducer: {
        [competitiveStandingApi.reducerPath]: competitiveStandingApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(competitiveStandingApi.middleware),
});


