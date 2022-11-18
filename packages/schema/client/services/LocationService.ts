/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Location } from '../models/Location';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class LocationService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get all locations
     * @returns Location successful operation
     * @throws ApiError
     */
    public getAllLocations(): CancelablePromise<Array<Location>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/locations',
        });
    }

    /**
     * Get location by id
     * @param locationId
     * @returns Location successful operation
     * @throws ApiError
     */
    public getLocationById(
        locationId: string,
    ): CancelablePromise<Location> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/locations/{locationId}',
            path: {
                'locationId': locationId,
            },
        });
    }

}