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

import axios, { AxiosInstance, AxiosRequestConfig, ResponseType } from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || '',
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase()]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === 'object'
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== 'string'
    ) {
      body = JSON.stringify(body);
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { 'Content-Type': type }
            : {}),
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path,
      })
      .then(response => response.data);
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
