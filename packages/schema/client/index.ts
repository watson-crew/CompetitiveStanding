/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export { AppClient } from './AppClient';

export { ApiError } from './core/ApiError';
export { BaseHttpRequest } from './core/BaseHttpRequest';
export { CancelablePromise, CancelError } from './core/CancelablePromise';
export { OpenAPI } from './core/OpenAPI';
export type { OpenAPIConfig } from './core/OpenAPI';

export type { GameType } from './models/GameType';
export type { InitiateMatchResponse } from './models/InitiateMatchResponse';
export type { Location } from './models/Location';
export type { TeamHistoricResult } from './models/TeamHistoricResult';
export type { User } from './models/User';

export { LocationService } from './services/LocationService';
export { MatchService } from './services/MatchService';
export { UserService } from './services/UserService';
