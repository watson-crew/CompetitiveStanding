export enum Actions {
  firstNameChange = 'firstNameChange',
  lastNameChange = 'lastNameChange',
  memorableIdChange = 'memorableIdChange'
}

export type SignupAction = {
  action: Actions,
  value: string
}

export type SignupState = {
  firstName: string,
  lastName: string,
  memorableId: string
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
    default:
      return state
  }
}

export const initialState = {
  firstName: '',
  lastName: '',
  memorableId: ''
}