/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type CreateUserData = any;

export interface CreateUserPayload {
  /** @example "abc" */
  memorableId: string;
  /** @example "John" */
  firstName: string;
  /** @example "James" */
  lastName: string;
  /** @example "https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg" */
  profilePictureUrl?: string;
  /** @example 1 */
  homeLocationId?: number;
}

export interface GameRequirement {
  numberOfTeams: number;
  playersPerTeam: number;
}

/** @example {"min":{"playersPerTeam":1,"numberOfTeams":2},"max":{"playersPerTeam":6,"numberOfTeams":2}} */
export interface GameRequirements {
  max: GameRequirement;
  min: GameRequirement;
}

export interface GameResult {
  /**
   * @format date-time
   * @example "2022-11-25T09:19:43Z"
   */
  endTime: string;
  /** @example 1 */
  gameTypeId: number;
  /** @example 1 */
  id: number;
  /** @example "Nottingham" */
  locationPlayed: string;
  /**
   * @minItems 2
   * @uniqueItems true
   * @example ["abcxyz","aaa","bbbyyyzzz"]
   */
  participatingTeams: string[];
  playerRatingChanges?: RatingChanges;
  /**
   * @format date-time
   * @example "2022-11-25T09:12:28Z"
   */
  startTime: string;
  /** @example "abcdef" */
  winningTeamId: string;
}

export interface GameType {
  /** @example 1 */
  id: number;
  /** @example "Pool" */
  name: string;
  requirements: GameRequirements;
}

export type GetAllLocationsData = Location[];

export type GetAllUsersData = User[];

export type GetLocationByUrlData = Location;

export type GetRankingsForLocationData = Record<string, RankedPlayer[]>;

export interface GetRecentMatchesByMemorableIdData {
  results: GameResult[];
  resources: {
    /** @example {"abc":{"id":1,"memorableId":"abc","firstName":"John","lastName":"James","location":"London","profilePicture":"https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"},"xyz":{"id":2,"memorableId":"xyz","firstName":"John","lastName":"James","location":"London","profilePicture":"https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"}} */
    players: Record<string, User>;
  };
}

export interface GetRecentMatchesData {
  results: GameResult[];
  resources: {
    /** @example {"abc":{"id":1,"memorableId":"abc","firstName":"John","lastName":"James","location":"London","profilePicture":"https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"},"xyz":{"id":2,"memorableId":"xyz","firstName":"John","lastName":"James","location":"London","profilePicture":"https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"}} */
    players: Record<string, User>;
  };
}

export interface GetStatsByMemorableIdData {
  /** @example 10 */
  gamesPlayed: number;
  /** @example 5 */
  gamesWon: number;
  /** @example 50 */
  winPercentage: number;
  bestFriend: User;
  easyPickings: User;
  nemesis: User;
}

export type GetUserByMemorableIdData = User;

export interface InitiateMatchResponse {
  /**
   * The historic results for each team participating in the match
   * @example {"abcxyz":{"wins":2},"aaa":{"wins":8},"bbbyyyzzz":{"wins":9}}
   */
  historicResults: Record<string, TeamHistoricResult>;
  /** @example 519 */
  matchId: number;
  playerRatings: PlayerRatings;
}

export type InitiateNewMatchData = InitiateMatchResponse;

export interface InitiateNewMatchPayload {
  /** @example 1 */
  gameTypeId: number;
  /** @example 1 */
  locationId: number;
  /**
   * @minItems 1
   * @uniqueItems true
   * @example ["abcxyz","aaa","bbbyyyzzz"]
   */
  participatingTeams: string[];
}

export interface Location {
  /** @uniqueItems true */
  availableGames: GameType[];
  /** @example 1 */
  id: number;
  /**
   * The most played game at the given location
   * @example 1
   */
  mostPopularGame?: number;
  /** @example "Nottingham" */
  name: string;
  /** @example 65 */
  playerCount: number;
  /** @example "nottingham" */
  urlPath: string;
}

/** @example {"abc":980,"xyz":1214} */
export type PlayerRatings = Record<string, number>;

export interface RankedPlayer {
  /** @example "1200" */
  elo: number;
  /** @example 44 */
  gamesPlayed: number;
  player: User;
  /** @example "62" */
  winPercentage: number;
  /** @example 27 */
  wins: number;
}

/** @example {"abc":120,"xyz":-84} */
export type RatingChanges = Record<string, number>;

export type RecordMatchResultsData = RatingChanges;

export interface RecordMatchResultsPayload {
  updateType: RecordMatchResultsPayloadUpdateType;
  updateDetails?: WinningTeamDetails;
}

export type ResultFilterType = 'wins' | 'elo' | 'winPercentage';

export interface Team {
  /** @example "abcxyz" */
  cumulativeTeamId: string;
  /** @example 1 */
  id?: number;
  /**
   * @minItems 1
   * @uniqueItems true
   */
  players: User[];
}

export interface TeamHistoricResult {
  wins: number;
}

export interface User {
  /** @example "John" */
  firstName: string;
  /** @example "1" */
  id: number;
  /** @example "James" */
  lastName: string;
  /** @example "London" */
  location?: string;
  /** @example "abc" */
  memorableId: string;
  /** @example "https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg" */
  profilePicture?: string;
}

export interface WinningTeamDetails {
  winningTeamId: string;
}

export type RecordMatchResultsPayloadUpdateType = 'SET_WINNER' | 'ABANDON_GAME';

export namespace User {
  /**
   * No description
   * @tags user
   * @name CreateUser
   * @summary Create a new user
   * @request POST:/users
   */
  export namespace CreateUser {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateUserPayload;
    export type RequestHeaders = {};
    export type ResponseBody = CreateUserData;
  }
  /**
   * No description
   * @tags user
   * @name GetUserByMemorableId
   * @summary Get user by memorable id
   * @request GET:/users/{memorableId}
   */
  export namespace GetUserByMemorableId {
    export type RequestParams = {
      /** @example "4e8" */
      memorableId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUserByMemorableIdData;
  }
}

export namespace Users {
  /**
   * No description
   * @tags users
   * @name GetAllUsers
   * @summary Get all users
   * @request GET:/users/all
   */
  export namespace GetAllUsers {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetAllUsersData;
  }
}

export namespace Location {
  /**
   * No description
   * @tags location
   * @name GetAllLocations
   * @summary Get all locations
   * @request GET:/locations
   */
  export namespace GetAllLocations {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetAllLocationsData;
  }
  /**
   * No description
   * @tags location
   * @name GetLocationByUrl
   * @summary Get location by urlPath
   * @request GET:/locations/{urlPath}
   */
  export namespace GetLocationByUrl {
    export type RequestParams = {
      urlPath: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetLocationByUrlData;
  }
}

export namespace Matches {
  /**
   * No description
   * @tags matches
   * @name InitiateNewMatch
   * @summary Initiate a match between a number of teams
   * @request POST:/matches
   */
  export namespace InitiateNewMatch {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = InitiateNewMatchPayload;
    export type RequestHeaders = {};
    export type ResponseBody = InitiateNewMatchData;
  }
  /**
   * No description
   * @tags matches
   * @name RecordMatchResults
   * @summary Record the results of a given match
   * @request PUT:/matches/{matchId}
   */
  export namespace RecordMatchResults {
    export type RequestParams = {
      /** @example 1 */
      matchId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = RecordMatchResultsPayload;
    export type RequestHeaders = {};
    export type ResponseBody = RecordMatchResultsData;
  }
  /**
   * No description
   * @tags matches, location
   * @name GetRecentMatches
   * @summary Get all recent matches at a given location
   * @request GET:/matches/recent
   */
  export namespace GetRecentMatches {
    export type RequestParams = {};
    export type RequestQuery = {
      locationId: number;
      offset?: number;
      total?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetRecentMatchesData;
  }
  /**
   * No description
   * @tags matches, location
   * @name GetRankingsForLocation
   * @summary Get top players for a given location and game type
   * @request GET:/matches/rankings
   */
  export namespace GetRankingsForLocation {
    export type RequestParams = {};
    export type RequestQuery = {
      locationId: number;
      gameTypeId: number;
      /** @minItems 1 */
      filterTypes: ResultFilterType[];
      offset?: number;
      total?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetRankingsForLocationData;
  }
}

export namespace Player {
  /**
   * No description
   * @tags player, matches
   * @name GetRecentMatchesByMemorableId
   * @summary Get recent matches of a given player given their memorable id
   * @request GET:/players/{memorableId}/matches
   */
  export namespace GetRecentMatchesByMemorableId {
    export type RequestParams = {
      /** @example "4e8" */
      memorableId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetRecentMatchesByMemorableIdData;
  }
  /**
   * No description
   * @tags player, stats
   * @name GetStatsByMemorableId
   * @summary Get stats of a given player given their memorable id
   * @request GET:/players/{memorableId}/stats
   */
  export namespace GetStatsByMemorableId {
    export type RequestParams = {
      /** @example "4e8" */
      memorableId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetStatsByMemorableIdData;
  }
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = '';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(
      typeof value === 'number' ? value : `${value}`,
    )}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      key => 'undefined' !== typeof query[key],
    );
    return keys
      .map(key =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== 'string'
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ''}${path}${
        queryString ? `?${queryString}` : ''
      }`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { 'Content-Type': type }
            : {}),
        },
        signal: cancelToken
          ? this.createAbortSignal(cancelToken)
          : requestParams.signal,
        body:
          typeof body === 'undefined' || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async response => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then(data => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch(e => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data.data;
    });
  };
}

/**
 * @title Competitive Standing Schema
 * @version 0.0.1
 * @externalDocs http://swagger.io
 *
 * Schema for the CompetitiveStandingAPI to create and track the results of various games
 */
export class ApiClient<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  user = {
    /**
     * No description
     *
     * @tags user
     * @name CreateUser
     * @summary Create a new user
     * @request POST:/users
     */
    createUser: (data: CreateUserPayload, params: RequestParams = {}) =>
      this.request<CreateUserData, any>({
        path: `/users`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name GetUserByMemorableId
     * @summary Get user by memorable id
     * @request GET:/users/{memorableId}
     */
    getUserByMemorableId: (memorableId: string, params: RequestParams = {}) =>
      this.request<GetUserByMemorableIdData, void>({
        path: `/users/${memorableId}`,
        method: 'GET',
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags users
     * @name GetAllUsers
     * @summary Get all users
     * @request GET:/users/all
     */
    getAllUsers: (params: RequestParams = {}) =>
      this.request<GetAllUsersData, any>({
        path: `/users/all`,
        method: 'GET',
        ...params,
      }),
  };
  location = {
    /**
     * No description
     *
     * @tags location
     * @name GetAllLocations
     * @summary Get all locations
     * @request GET:/locations
     */
    getAllLocations: (params: RequestParams = {}) =>
      this.request<GetAllLocationsData, any>({
        path: `/locations`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags location
     * @name GetLocationByUrl
     * @summary Get location by urlPath
     * @request GET:/locations/{urlPath}
     */
    getLocationByUrl: (urlPath: string, params: RequestParams = {}) =>
      this.request<GetLocationByUrlData, any>({
        path: `/locations/${urlPath}`,
        method: 'GET',
        ...params,
      }),
  };
  matches = {
    /**
     * No description
     *
     * @tags matches
     * @name InitiateNewMatch
     * @summary Initiate a match between a number of teams
     * @request POST:/matches
     */
    initiateNewMatch: (
      data: InitiateNewMatchPayload,
      params: RequestParams = {},
    ) =>
      this.request<InitiateNewMatchData, void>({
        path: `/matches`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags matches
     * @name RecordMatchResults
     * @summary Record the results of a given match
     * @request PUT:/matches/{matchId}
     */
    recordMatchResults: (
      matchId: number,
      data: RecordMatchResultsPayload,
      params: RequestParams = {},
    ) =>
      this.request<RecordMatchResultsData, any>({
        path: `/matches/${matchId}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags matches, location
     * @name GetRecentMatches
     * @summary Get all recent matches at a given location
     * @request GET:/matches/recent
     */
    getRecentMatches: (
      query: {
        locationId: number;
        offset?: number;
        total?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetRecentMatchesData, any>({
        path: `/matches/recent`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags matches, location
     * @name GetRankingsForLocation
     * @summary Get top players for a given location and game type
     * @request GET:/matches/rankings
     */
    getRankingsForLocation: (
      query: {
        locationId: number;
        gameTypeId: number;
        /** @minItems 1 */
        filterTypes: ResultFilterType[];
        offset?: number;
        total?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetRankingsForLocationData, any>({
        path: `/matches/rankings`,
        method: 'GET',
        query: query,
        ...params,
      }),
  };
  player = {
    /**
     * No description
     *
     * @tags player, matches
     * @name GetRecentMatchesByMemorableId
     * @summary Get recent matches of a given player given their memorable id
     * @request GET:/players/{memorableId}/matches
     */
    getRecentMatchesByMemorableId: (
      memorableId: string,
      params: RequestParams = {},
    ) =>
      this.request<GetRecentMatchesByMemorableIdData, void>({
        path: `/players/${memorableId}/matches`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags player, stats
     * @name GetStatsByMemorableId
     * @summary Get stats of a given player given their memorable id
     * @request GET:/players/{memorableId}/stats
     */
    getStatsByMemorableId: (memorableId: string, params: RequestParams = {}) =>
      this.request<GetStatsByMemorableIdData, void>({
        path: `/players/${memorableId}/stats`,
        method: 'GET',
        ...params,
      }),
  };
}
