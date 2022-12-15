import { CreateUserPayload } from 'schema';

export enum SignUpActionType {
  FieldUpdated = 'fieldUpdated',
  AddValidationError = 'validationErrorAdded',
  AddGlobalError = 'globalErrorAdded',
  ValidatingField = 'validatingMemorableId',
  ValidatedField = 'validatedMemorableId',
  ResetGlobalErrors = 'resetGlobalErrors',
  ResetState = 'resetState',
}

interface SignUpAction<T extends SignUpActionType, P> {
  readonly type: T;
  readonly payload?: P;
}

type FieldUpdateAction = SignUpAction<
  SignUpActionType.FieldUpdated,
  { field: keyof CreateUserPayload; value: string | number }
>;

type AddFieldValidationErrorAction = SignUpAction<
  SignUpActionType.AddValidationError,
  { field: keyof CreateUserPayload; errorMessage: string }
>;

type AddGlobalErrorAction = SignUpAction<
  SignUpActionType.AddGlobalError,
  { errorMessage: string }
>;

type ValidatedFieldAction = SignUpAction<
  SignUpActionType.ValidatedField,
  { field: keyof CreateUserPayload }
>;

type ValidatingFieldAction = SignUpAction<
  SignUpActionType.ValidatingField,
  { field: keyof CreateUserPayload }
>;

type ResetGlobalErrorsAction = SignUpAction<
  SignUpActionType.ResetGlobalErrors,
  void
>;

type ResetStateAction = SignUpAction<SignUpActionType.ResetState, void>;

export type SignupActions =
  | FieldUpdateAction
  | AddFieldValidationErrorAction
  | AddGlobalErrorAction
  | ResetStateAction
  | ResetGlobalErrorsAction
  | ValidatedFieldAction
  | ValidatingFieldAction;

export type FormFieldState<T> = {
  value?: T;
  validating?: boolean;
  isValid?: boolean;
  errorMessage?: string;
};

export type SignupState = {
  fields: {
    firstName: FormFieldState<string>;
    lastName: FormFieldState<string>;
    memorableId: FormFieldState<string>;
    homeLocationId: FormFieldState<number>;
    profilePictureUrl: FormFieldState<string>;
  };
  globalErrors: string[];
};

const getStateWithUpdatedField = <T>(
  state: SignupState,
  fieldName: keyof CreateUserPayload,
  fieldValue: FormFieldState<T>,
): SignupState => {
  const updatedField = {
    ...state.fields[fieldName],
    ...fieldValue,
  };

  return {
    ...state,
    fields: {
      ...state.fields,
      [fieldName]: updatedField,
    },
  };
};

export function signUpReducer(
  state: SignupState,
  { type, payload }: SignupActions,
): SignupState {
  switch (type) {
    case SignUpActionType.FieldUpdated:
      if (!payload) return state;

      return getStateWithUpdatedField(state, payload.field, {
        value: payload.value,
      });
    case SignUpActionType.AddValidationError:
      if (!payload) return state;

      return getStateWithUpdatedField(state, payload.field, {
        errorMessage: payload.errorMessage,
        isValid: false,
        validating: false,
      });
    case SignUpActionType.AddGlobalError:
      if (!payload) return state;

      return {
        ...state,
        globalErrors: [...state.globalErrors, payload.errorMessage],
      };
    case SignUpActionType.ResetGlobalErrors:
      return {
        ...state,
        globalErrors: [],
      };
    case SignUpActionType.ResetState:
      return initialState;
    case SignUpActionType.ValidatedField:
      if (!payload) return state;

      return getStateWithUpdatedField(state, payload.field, {
        isValid: true,
        validating: false,
      });
    case SignUpActionType.ValidatingField:
      if (!payload) return state;

      return getStateWithUpdatedField(state, payload.field, {
        validating: true,
      });
    default:
      return state;
  }
}

export const initialState: SignupState = {
  fields: {
    firstName: {} as FormFieldState<string>,
    lastName: {},
    memorableId: {},
    homeLocationId: {},
    profilePictureUrl: {},
  },
  globalErrors: [],
};
