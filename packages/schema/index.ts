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

export type CreateUserData = User;

export interface GameType {
  /** @example 1 */
  id: number;
  /** @example "1" */
  maxNumberOfPlayers: number;
  /** @example "Pool" */
  name: string;
}

export type GetAllLocationsData = Location[];

export type GetLocationByIdData = Location;

export type GetUserByMemorableIdData = User;

export interface InitiateMatchResponse {
  /**
   * The historic results for each team participating in the match
   * @example {"abcxyz":{"wins":2},"aaa":{"wins":8},"bbbyyyzzz":{"wins":9}}
   */
  historicResults: Record<string, TeamHistoricResult>;
  /** @example 519 */
  matchId: number;
}

export type InitiateNewMatchData = InitiateMatchResponse;

export interface InitiateNewMatchPayload {
  /** @example 1 */
  gameTypeId: number;
  /** @example 1 */
  locationId: number;
  /** @example ["abcxyz","aaa","bbbyyyzzz"] */
  participatingTeams: string[];
}

export interface Location {
  availableGames?: GameType[];
  /** @example "https://www.thetrainline.com/content/vul/hero-images/city/nottingham/1x.jpg" */
  coverPhoto?: string;
  /** @example 1 */
  id: number;
  /** @example "Nottingham" */
  name: string;
}

export type RecordMatchResultsData = any;

export interface RecordMatchResultsPayload {
  winningTeamId: number;
}

export interface TeamHistoricResult {
  wins?: number;
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

export interface UserInput {
  /** @example "John" */
  firstName: string;
  /** @example 1 */
  homeLocationId?: number;
  /** @example "James" */
  lastName: string;
  /** @example "abc" */
  memorableId: string;
  /** @example "https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg" */
  profilePictureUrl?: string;
}

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
    export type RequestBody = UserInput;
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
   * @name GetLocationById
   * @summary Get location by id
   * @request GET:/locations/{locationId}
   */
  export namespace GetLocationById {
    export type RequestParams = {
      locationId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetLocationByIdData;
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
   * @request PUT:/matches/${matchId}
   */
  export namespace RecordMatchResults {
    export type RequestParams = {
      matchId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = RecordMatchResultsPayload;
    export type RequestHeaders = {};
    export type ResponseBody = RecordMatchResultsData;
  }
}

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from 'axios';

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
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
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
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
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

    return this.instance.request({
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
    createUser: (data: UserInput, params: RequestParams = {}) =>
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
     * @name GetLocationById
     * @summary Get location by id
     * @request GET:/locations/{locationId}
     */
    getLocationById: (locationId: number, params: RequestParams = {}) =>
      this.request<GetLocationByIdData, any>({
        path: `/locations/${locationId}`,
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
     * @request PUT:/matches/${matchId}
     */
    recordMatchResults: (
      matchId: string,
      data: RecordMatchResultsPayload,
      params: RequestParams = {},
    ) =>
      this.request<RecordMatchResultsData, any>({
        path: `/matches/$${matchId}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
}
