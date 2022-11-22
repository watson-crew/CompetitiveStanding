/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InitiateMatchResponse } from '../models/InitiateMatchResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class MatchesService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Initiate a match between a number of teams
     * @returns InitiateMatchResponse Successful operation
     * @throws ApiError
     */
    public initiateNewMatch({
        requestBody,
    }: {
        /**
         * The details of the match to be initiated
         */
        requestBody: {
            gameTypeId: number;
            locationId: number;
            participatingTeams: Array<string>;
        },
    }): CancelablePromise<InitiateMatchResponse> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/matches',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
            },
        });
    }

}
