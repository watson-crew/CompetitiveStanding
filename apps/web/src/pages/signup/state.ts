export enum Actions {
  firstNameChange = 'firstNameChange',
  lastNameChange = 'lastNameChange',
  memorableIdChange = 'memorableIdChange',
  memorableIdError = 'memorableIdError',
  resetState = 'resetState'
}

export type SignupAction = {
  action: Actions,
  value?: any
}

export type SignupState = {
  firstName: string,
  lastName: string,
  memorableId: string,
  memorableIdExists: boolean
}

export function signupReducer(state: SignupState, action: SignupAction): SignupState {
  switch (action.action) {
    case Actions.firstNameChange:
      return {
        ...state,
        firstName: action.value
      }
    case Actions.lastNameChange:
      return {
        ...state,
        lastName: action.value
      }
    case Actions.memorableIdChange:
      return {
        ...state,
        memorableId: action.value
      }
    case Actions.memorableIdError:
      return {
        ...state,
        memorableIdExists: action.value
      }
    case Actions.resetState:
      return initialState
    default:
      return state
  }
}

export const initialState = {
  firstName: '',
  lastName: '',
  memorableId: '',
  memorableIdExists: false
}