import { GetResultsForLocationResult } from '@src/types';
import { TeamWithPlayers } from 'database';
import { GameResult, GetRecentMatchesData, User } from 'schema';
import { Mapper } from './generics';
import { distinct } from '@src/utils/collectionUtils';

const extractPlayers = (
  allResultTeams: Partial<TeamWithPlayers>[][],
): Record<string, User> => {
  const allUsers = allResultTeams.flatMap(teamForResult =>
    teamForResult.flatMap(team => team.players),
  );

  return Object.fromEntries(
    distinct(allUsers, 'id').map(user => [user.memorableId, user]),
  );
};

export const gameResultMapper: Mapper<
  GetResultsForLocationResult[],
  GetRecentMatchesData
> = {
  map: queryResult => {
    const results: GameResult[] = queryResult.map(res => {
      return {
        id: res.id,
        participatingTeams: res.teams.map(team => team.cumulativeTeamId),
        startTime: res.startTime.toISOString(),
        endTime: res.endTime.toISOString(),
        winningTeamId: res.winningTeam.cumulativeTeamId,
        locationPlayed: res.locationPlayed.name,
      } as GameResult;
    });

    const resources = {
      players: extractPlayers(queryResult.map(res => res.teams)),
    };

    return {
      results,
      resources,
    };
  },
};
