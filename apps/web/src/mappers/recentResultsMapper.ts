import { GameResult, TeamWithRatings } from 'ui';
import { GameType, GetRecentMatchesData, RankingChanges, User } from 'schema';
import dayjs from 'dayjs';
import { extractPlayerIds } from '@src/utils/teamUtils';

function mapTeam(
  players: Record<string, User>,
  playerEloChanges: RankingChanges | undefined,
  cumulativeTeamId: string,
): TeamWithRatings {
  return {
    cumulativeTeamId,
    players: extractPlayerIds(cumulativeTeamId).map(playerId => ({
      ...players[playerId],
      eloChange: playerEloChanges ? playerEloChanges[playerId] : undefined,
    })),
  };
}

export default function mapRecentResults(
  { resources, results }: GetRecentMatchesData,
  gameTypes: Record<number, Omit<GameType, 'requirements'>>,
): GameResult[] {
  return results?.map(result => {
    return {
      teams: result.participatingTeams?.map(team =>
        mapTeam(resources?.players, result.playerRatingChanges, team),
      ),
      gameType: gameTypes[result.gameTypeId] as GameType,
      winningTeamId: result.winningTeamId,
      startTime: dayjs(result.startTime),
      endTime: dayjs(result.endTime),
      location: result.locationPlayed,
    };
  });
}
