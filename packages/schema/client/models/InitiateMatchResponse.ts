/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TeamHistoricResult } from './TeamHistoricResult';

export type InitiateMatchResponse = {
    matchId: number;
    /**
     * The historic results for each team participating in the match
     */
    historicResults: Record<string, TeamHistoricResult>;
};

