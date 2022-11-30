import { CreateUserPayload, User } from 'schema';
import { ApiContext } from '@src/context/ApiContext';
import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { Banner, Button, Card, PlayerCard, Text, TextInput } from 'ui';
import { Actions, initialState, signupReducer, SignupState } from './state';
import Image from 'next/image';

export default function Index() {
  const api = useContext(ApiContext);
  const [signupState, dispatch] = useReducer(signupReducer, initialState);

  useEffect(() => {
    if (signupState.memorableId.length === 3) {
      doesMemorableIdExist(signupState.memorableId);
    }
  }, [signupState.memorableId]);

  const handleOnChange = (
    action: Actions,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch({ action, inputValue: event.target.value });
  };

  const handleError = (message: string) => {
    if (signupState.errorMessages.find(text => text === message) === undefined)
      dispatch({ action: Actions.setError, errorMessage: message });
  };

  const createUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let error = false;
    const {
      firstName,
      lastName,
      memorableId,
      memorableIdExists,
      profilePictureUrl,
    } = signupState;

    const user: CreateUserPayload = {
      firstName,
      lastName,
      memorableId,
      homeLocationId: 1,
      profilePictureUrl,
    };

    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      memorableId.length === 0
    ) {
      error = true;
      handleError('Please fill in all the fields');
    }

    if (memorableIdExists) {
      error = true;
      handleError('Please fill in a unique player ID');
    }

    try {
      if (error) return;
      await api.user.createUser(user);
      dispatch({ action: Actions.resetState });
    } catch (e) {
      handleError('Error creating player');
    }
  };

  const doesMemorableIdExist = async (memborableId: string) => {
    try {
      await api.user.getUserByMemorableId(memborableId);
      dispatch({ action: Actions.memorableIdExists, inputCheck: true });
    } catch (e) {
      dispatch({ action: Actions.memorableIdExists, inputCheck: false });
    }
  };

  const placeholders: Omit<SignupState, 'memorableIdExists' | 'errorMessages'> =
    {
      firstName: 'Joe',
      lastName: 'Bloggs',
      memorableId: 'abc',
    };

  const playerPreview: User = {
    id: -1,
    firstName: signupState.firstName || placeholders.firstName,
    lastName: signupState.lastName || placeholders.lastName,
    memorableId: signupState.memorableId || placeholders.memorableId,
    profilePicture: signupState.profilePictureUrl,
    location: 'Nottingham',
  };

  return (
    <div className="mt-20 flex h-screen flex-col items-center">
      <h1 className="mb-24 text-3xl font-bold underline">Sign up</h1>
      {signupState.errorMessages.length > 0 ? (
        <Banner className="mb-6 w-96" type="error">
          {signupState.errorMessages.map((error, index) => (
            <Text key={index} type="p">
              {error}
            </Text>
          ))}
        </Banner>
      ) : null}
      <div className="flex">
        <Card className="mx-5 w-96">
          <form onSubmit={createUser}>
            <TextInput
              id="firstName"
              title="First Name"
              placeholder={placeholders.firstName}
              value={signupState.firstName}
              onChange={event => handleOnChange(Actions.firstNameChange, event)}
              maxLength={24}
            />
            <TextInput
              id="lastName"
              title="Last Name"
              placeholder={placeholders.lastName}
              value={signupState.lastName}
              onChange={event => handleOnChange(Actions.lastNameChange, event)}
              maxLength={24}
            />
            <TextInput
              id="memorableId"
              title="Memorable ID"
              placeholder={placeholders.memorableId}
              value={signupState.memorableId}
              onChange={event =>
                handleOnChange(Actions.memorableIdChange, event)
              }
              maxLength={3}
            />
            <TextInput
              id="profilePicture"
              title="Profile Picture Url"
              placeholder="https://ca.slack-edge.com/..."
              tooltipContent={
                <div className="m-2 flex max-w-min flex-col">
                  <Text type="p" className="whitespace-normal text-xs">
                    Currently only Slack images are supported
                  </Text>
                  <div className="relative mt-2 h-32 w-32">
                    <Image
                      src="/profileUrlTooltip.gif"
                      fill={true}
                      alt=""
                      className="inline-block"
                    />
                  </div>
                </div>
              }
              value={signupState.profilePictureUrl || ''}
              onChange={event =>
                handleOnChange(Actions.profilePictureChange, event)
              }
            />
            <Button
              type="submit"
              text="Create player"
              className="mt-8 mb-2 w-full"
            />
          </form>
        </Card>
        <div className="mx-5 h-full w-96">
          <PlayerCard player={playerPreview} />
        </div>
      </div>
    </div>
  );
}
