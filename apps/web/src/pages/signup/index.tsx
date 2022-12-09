import { CreateUserPayload, User } from 'schema';
import { ApiContext, getApiInstance } from '@src/context/ApiContext';
import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import {
  Banner,
  Button,
  Card,
  PlayerCard,
  SelectInput,
  Text,
  TextInput,
} from 'ui';
import {
  SignUpActionType,
  initialState,
  signUpReducer,
  SignupState,
} from './state';
import Image from 'next/image';
import Head from 'next/head';
import {
  getLocationStaticPropsFactory,
  PagePropsWithLocation,
} from '@src/utils/staticPropUtils';
import React from 'react';

export const getStaticProps = getLocationStaticPropsFactory(getApiInstance());

export default function Index({ locations }: PagePropsWithLocation) {
  const api = useContext(ApiContext);
  const [{ fields, globalErrors }, dispatch] = useReducer(
    signUpReducer,
    initialState,
  );

  const [signedUpPlayer, setSignedUpPlayer] = useState<
    CreateUserPayload | undefined
  >();

  useEffect(() => {
    async function validateMemorableId(memorableId: string) {
      try {
        dispatch({
          type: SignUpActionType.ValidatingField,
          payload: { field: 'memorableId' },
        });
        await api.user.getUserByMemorableId(memorableId);
        dispatch({
          type: SignUpActionType.AddValidationError,
          payload: {
            errorMessage: 'Memorable Id already in use',
            field: 'memorableId',
          },
        });
      } catch (e) {
        dispatch({
          type: SignUpActionType.ValidatedField,
          payload: { field: 'memorableId' },
        });
      }
    }

    if (fields.memorableId.value?.length === 3) {
      validateMemorableId(fields.memorableId.value);
    }
  }, [fields.memorableId.value, api]);

  const handleFieldUpdated = (
    fieldName: keyof CreateUserPayload,
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    parser: (value: string) => string | number = str => str,
  ) => {
    dispatch({
      type: SignUpActionType.FieldUpdated,
      payload: { field: fieldName, value: parser(event.target.value) },
    });
  };

  const createUserPayload = ({
    firstName,
    lastName,
    memorableId,
    homeLocationId,
    profilePictureUrl,
  }: SignupState['fields']): CreateUserPayload | undefined => {
    // This can be done better
    if (!firstName.value || !lastName.value || !memorableId.value) {
      return undefined;
    }

    return {
      firstName: firstName.value,
      lastName: lastName.value,
      memorableId: memorableId.value,
      homeLocationId: parseInt(String(homeLocationId.value)),
      profilePictureUrl: profilePictureUrl.value,
    };
  };

  const createUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: SignUpActionType.ResetGlobalErrors });

    const user = createUserPayload(fields);

    if (!user) {
      dispatch({
        type: SignUpActionType.AddGlobalError,
        payload: { errorMessage: 'Please fill in all the fields' },
      });
      return;
    }

    try {
      await api.user.createUser(user as CreateUserPayload);
      dispatch({ type: SignUpActionType.ResetState });
      setSignedUpPlayer(user as CreateUserPayload);
    } catch (e) {
      dispatch({
        type: SignUpActionType.AddGlobalError,
        payload: { errorMessage: 'Error creating player' },
      });
    }
  };

  const locationOptions = Object.values(locations).map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  const placeholders: CreateUserPayload = {
    firstName: 'Joe',
    lastName: 'Bloggs',
    memorableId: 'a1b',
    homeLocationId: locationOptions[0].value,
  };

  const playerPreview: User = {
    id: -1,
    firstName: fields.firstName.value || placeholders.firstName,
    lastName: fields.lastName.value || placeholders.lastName,
    memorableId: fields.memorableId.value || placeholders.memorableId,
    profilePicture: fields.profilePictureUrl.value,
    location: locations[fields.homeLocationId.value || 1].name,
  };

  return (
    <main className="mt-20 flex h-screen flex-col items-center">
      <Head>
        <title>{`Competitive Standing | Sign Up`}</title>
      </Head>

      <h1 className="mb-10 text-3xl font-bold underline">Sign up</h1>
      {globalErrors.length > 0 ? (
        <Banner className="mb-6 w-96" type="error">
          {globalErrors.map((error, index) => (
            <Text key={index} type="p">
              {error}
            </Text>
          ))}
        </Banner>
      ) : null}

      {signedUpPlayer && (
        <Banner
          type="success"
          className="mb-10 text-center"
          onClose={() => setSignedUpPlayer(undefined)}
        >
          <Text type="p" className="px-20">
            User signed up successfully.
          </Text>
          <Text type="p" className="px-20">
            Welcome {signedUpPlayer.firstName}! Your player id is:{' '}
            <span className="font-extrabold">{signedUpPlayer.memorableId}</span>
          </Text>
        </Banner>
      )}
      <div className="flex">
        <Card className="mx-5 w-96">
          <form onSubmit={createUser}>
            <TextInput
              id="firstName"
              title="First Name"
              placeholder={placeholders.firstName}
              value={fields.firstName.value || ''}
              onChange={event => handleFieldUpdated('firstName', event)}
              maxLength={24}
              required={true}
            />
            <TextInput
              id="lastName"
              title="Last Name"
              placeholder={placeholders.lastName}
              value={fields.lastName.value || ''}
              onChange={event => handleFieldUpdated('lastName', event)}
              maxLength={24}
              required={true}
            />
            <TextInput
              id="memorableId"
              title="Memorable ID"
              placeholder={placeholders.memorableId}
              validating={fields.memorableId.validating}
              isValid={fields.memorableId.isValid}
              errorMessage={fields.memorableId.errorMessage}
              value={fields.memorableId.value || ''}
              tooltipContent={
                <span className="flex w-32 p-2 text-center">
                  <Text type="p" className="whitespace-normal text-xs">
                    Your memorable id is a unique 3 character id that you will
                    use to join games
                  </Text>
                </span>
              }
              onChange={event => handleFieldUpdated('memorableId', event)}
              maxLength={3}
              required={true}
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
              value={fields.profilePictureUrl.value || ''}
              onChange={event => handleFieldUpdated('profilePictureUrl', event)}
            />
            <SelectInput
              title="Home location"
              required={true}
              options={locationOptions}
              id="homeLocation"
              value={fields.homeLocationId.value || locationOptions[0].value}
              onChange={event =>
                handleFieldUpdated('homeLocationId', event, id => parseInt(id))
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
    </main>
  );
}
