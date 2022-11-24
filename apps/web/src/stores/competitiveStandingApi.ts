import { emptySplitApi as api } from './emptyApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    createUser: build.mutation<CreateUserApiResponse, CreateUserApiArg>({
      query: queryArg => ({
        url: `/users`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    getUserByMemorableId: build.query<
      GetUserByMemorableIdApiResponse,
      GetUserByMemorableIdApiArg
    >({
      query: queryArg => ({ url: `/users/${queryArg.memorableId}` }),
    }),
    getAllLocations: build.query<
      GetAllLocationsApiResponse,
      GetAllLocationsApiArg
    >({
      query: () => ({ url: `/locations` }),
    }),
    getLocationById: build.query<
      GetLocationByIdApiResponse,
      GetLocationByIdApiArg
    >({
      query: queryArg => ({ url: `/locations/${queryArg.locationId}` }),
    }),
    initiateNewMatch: build.mutation<
      InitiateNewMatchApiResponse,
      InitiateNewMatchApiArg
    >({
      query: queryArg => ({
        url: `/matches`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    recordMatchResults: build.mutation<
      RecordMatchResultsApiResponse,
      RecordMatchResultsApiArg
    >({
      query: queryArg => ({
        url: `/matches/${queryArg.matchId}`,
        method: 'PUT',
        body: queryArg.body,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as competitiveStandingApi };
export type CreateUserApiResponse = unknown;
export type CreateUserApiArg = {
  body: {
    memorableId: string;
    firstName: string;
    lastName: string;
    profilePictureUrl?: string;
    homeLocationId?: number;
  };
};
export type GetUserByMemorableIdApiResponse =
  /** status 200 successful operation */ User;
export type GetUserByMemorableIdApiArg = {
  memorableId: string;
};
export type GetAllLocationsApiResponse =
  /** status 200 successful operation */ Location[];
export type GetAllLocationsApiArg = void;
export type GetLocationByIdApiResponse =
  /** status 200 successful operation */ Location;
export type GetLocationByIdApiArg = {
  locationId: number;
};
export type InitiateNewMatchApiResponse =
  /** status 201 Successful operation */ InitiateMatchResponse;
export type InitiateNewMatchApiArg = {
  /** The details of the match to be initiated */
  body: {
    gameTypeId: number;
    locationId: number;
    participatingTeams: string[];
  };
};
export type RecordMatchResultsApiResponse = unknown;
export type RecordMatchResultsApiArg = {
  matchId: number;
  body: {
    winningTeamId: number;
  };
};
export type User = {
  id: number;
  memorableId: string;
  firstName: string;
  lastName: string;
  location?: string;
  profilePicture?: string;
};
export type GameType = {
  id: number;
  name: string;
  maxNumberOfPlayers: number;
};
export type Location = {
  id: number;
  name: string;
  coverPhoto?: string;
  availableGames?: GameType[];
};
export type TeamHistoricResult = {
  wins?: number;
};
export type InitiateMatchResponse = {
  matchId: number;
  historicResults: {
    [key: string]: TeamHistoricResult;
  };
};
export const {
  useCreateUserMutation,
  useGetUserByMemorableIdQuery,
  useGetAllLocationsQuery,
  useGetLocationByIdQuery,
  useInitiateNewMatchMutation,
  useRecordMatchResultsMutation,
} = injectedRtkApi;
