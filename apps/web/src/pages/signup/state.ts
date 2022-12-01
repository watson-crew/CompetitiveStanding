export enum Actions {
  firstNameChange = 'firstNameChange',
  lastNameChange = 'lastNameChange',
  memorableIdChange = 'memorableIdChange',
  profilePictureChange = 'profilePictureChange',
  memorableIdExists = 'memorableIdExists',
  resetState = 'resetState',
  setError = 'setError',
}

export type SignupAction = {
  action: Actions;
  inputValue?: string;
  inputCheck?: boolean;
  errorMessage?: string | undefined;
};

export type SignupState = {
  firstName: string;
  lastName: string;
  memorableId: string;
  memorableIdExists: boolean;
  profilePictureUrl?: string;
  errorMessages: Array<string | undefined>;
};

export function signupReducer(
  state: SignupState,
  action: SignupAction,
): SignupState {
  switch (action.action) {
    case Actions.firstNameChange:
      return {
        ...state,
        errorMessages: [],
        firstName: action.inputValue || '',
      };
    case Actions.lastNameChange:
      return {
        ...state,
        errorMessages: [],
        lastName: action.inputValue || '',
      };
    case Actions.memorableIdChange:
      return {
        ...state,
        errorMessages: [],
        memorableId: action.inputValue?.toLowerCase() || '',
      };
    case Actions.profilePictureChange:
      return {
        ...state,
        profilePictureUrl: action.inputValue,
      };
    case Actions.memorableIdExists:
      return {
        ...state,
        memorableIdExists: !!action.inputCheck,
      };
    case Actions.setError:
      return {
        ...state,
        errorMessages: [...state.errorMessages, action.errorMessage],
      };
    case Actions.resetState:
      return initialState;
    default:
      return state;
  }
}

export const initialState: SignupState = {
  firstName: '',
  lastName: '',
  memorableId: '',
  memorableIdExists: false,
  profilePictureUrl: undefined,
  errorMessages: [],
};
