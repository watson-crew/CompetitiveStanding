export enum Actions {
  firstNameChange = 'firstNameChange',
  lastNameChange = 'lastNameChange',
  memorableIdChange = 'memorableIdChange',
  memorableIdExists = 'memorableIdExists',
  resetState = 'resetState',
  setError = 'setError'
}

export type SignupAction = {
  action: Actions,
  value?: any,
  errorMessage?: string | undefined
}

export type SignupState = {
  firstName: string,
  lastName: string,
  memorableId: string,
  memorableIdExists: boolean,
  errorMessages: Array<string | undefined>
}

export function signupReducer(state: SignupState, action: SignupAction): SignupState {
  switch (action.action) {
    case Actions.firstNameChange:
      return {
        ...state,
        errorMessages: [],
        firstName: action.value
      }
    case Actions.lastNameChange:
      return {
        ...state,
        errorMessages: [],
        lastName: action.value
      }
    case Actions.memorableIdChange:
      return {
        ...state,
        errorMessages: [],
        memorableId: action.value
      }
    case Actions.memorableIdExists:
      return {
        ...state,
        memorableIdExists: action.value
      }
    case Actions.setError:
      return {
        ...state,
        errorMessages: [
          ...state.errorMessages,
          action.errorMessage
        ]
      }
    case Actions.resetState:
      return initialState
    default:
      return state
  }
}

export const initialState: SignupState = {
  firstName: '',
  lastName: '',
  memorableId: '',
  memorableIdExists: false,
  errorMessages: []
}