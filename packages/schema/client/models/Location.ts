/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GameType } from './GameType';

export type Location = {
    id: number;
    name: string;
    coverPhoto?: string;
    availableGames?: Array<GameType>;
};

