import {
  GetRankingsForLocationAndGameTypeResult,
  GetResultsForLocationResult,
} from '@src/types';
import { TeamWithPlayers } from 'database';
import { GameResult, RankedPlayer, GetRecentMatchesData, User } from 'schema';
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
        gameTypeId: res.gameType.id,
        playerRatingChanges: Object.fromEntries(
          res.ratingChanges.map(({ playerRanking, ratingChangeAmount }) => [
            playerRanking.player.memorableId,
            ratingChangeAmount,
          ]),
        ),
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

export const gameRankingsMapper: Mapper<
  GetRankingsForLocationAndGameTypeResult[],
  RankedPlayer[]
> = {
  map: queryResult => {
    const results: RankedPlayer[] = queryResult.map(res => {
      return {
        player: {
          id: res.id,
          memorableId: res.memorableId,
          firstName: res.firstName,
          lastName: res.lastName,
          profilePicture: res.profilePicture,
          locationId: res.locationId,
        },
        gamesPlayed: res.gamesPlayed,
        wins: res.gamesWon,
        winPercentage: res.winPercentage,
        elo: res.elo,
      };
    });

    return results;
  },
};
