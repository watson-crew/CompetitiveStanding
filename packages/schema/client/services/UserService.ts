/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class UserService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a new user
     * @returns User successful operation
     * @throws ApiError
     */
    public createUser({
        requestBody,
    }: {
        requestBody: {
            memorableId: string;
            firstName: string;
            lastName: string;
            profilePictureUrl?: string;
            homeLocationId?: number;
        },
    }): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/users',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get user by memorable id
     * @returns User successful operation
     * @throws ApiError
     */
    public getUserByMemorableId({
        memorableId,
    }: {
        memorableId: string,
    }): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users/{memorableId}',
            path: {
                'memorableId': memorableId,
            },
            errors: {
                404: `User not found`,
            },
        });
    }

}
