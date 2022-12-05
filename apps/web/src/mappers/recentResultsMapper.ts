import { GameResult } from 'ui';
import { GameType, GetRecentMatchesData, Team, User } from 'schema';
import dayjs from 'dayjs';
import { extractPlayerIds } from '@src/uilts/teamUtils';

function mapTeam(
  players: Record<string, User>,
  cumulativeTeamId: string,
): Omit<Team, 'id'> {
  return {
    cumulativeTeamId,
    players: extractPlayerIds(cumulativeTeamId).map(
      playerId => players[playerId],
    ),
  };
}

export default function mapRecentResults(
  { resources, results }: GetRecentMatchesData,
  gameTypes: Record<number, Omit<GameType, 'requirements'>>,
): GameResult[] {
  return results?.map(result => {
    return {
      teams: result.participatingTeams?.map(team =>
        mapTeam(resources?.players, team),
      ),
      gameType: gameTypes[result.gameTypeId] as GameType,
      winningTeamId: result.winningTeamId,
      startTime: dayjs(result.startTime),
      endTime: dayjs(result.endTime),
      location: result.locationPlayed,
    };
  });
}
