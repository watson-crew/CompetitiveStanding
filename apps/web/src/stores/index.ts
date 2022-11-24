import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

// TODO: Change from createStore to configureStore as createStore is deprecated (but following guide for now)
export const store = createStore(rootReducer, applyMiddleware(thunk))


