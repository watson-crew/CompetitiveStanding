import { combineReducers } from 'redux'

const initialState = {
    locations: []
  }

// Import specific reducers
// import todosReducer from './features/todos/todosSlice'
// import filtersReducer from './features/filters/filtersSlice'

// const rootReducer = combineReducers({
//   // Define a top-level state field named `todos`, handled by `todosReducer`
// //   todos: todosReducer,
// //   filters: filtersReducer
// })

// TODO: Add correct types
const rootReducer = (state = initialState, action: any) => {
    switch (action.type) {
        default:
            return state
    }
}

export default rootReducer