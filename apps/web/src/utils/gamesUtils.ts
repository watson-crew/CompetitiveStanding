import { LoadingPlayer, PlayerWithRating } from 'ui';
import { GameTeam, ParticipatingTeam } from '@src/types/games';
import { filterFalsey, sortByProperty } from './collectionUtils';
import {
  GameRequirement,
  PlayerRatings,
  TeamHistoricResult,
  User,
} from 'schema';

export function withUpdatedDetails(
  participatingTeams: ParticipatingTeam[],
  updatedRatings: PlayerRatings,
  updatedResults: Record<string, TeamHistoricResult>,
): ParticipatingTeam[] {
  return participatingTeams.map(({ cumulativeTeamId, players }) => ({
    cumulativeTeamId,
    players: withRatings(players, updatedRatings),
    historicResults: updatedResults[cumulativeTeamId],
  }));
}

export function withRatings(
  players: User[],
  playerRatings: PlayerRatings,
): PlayerWithRating[] {
  return players.map(player => ({
    ...player,
    elo: playerRatings[player.memorableId],
  }));
}

export function getStartingPlayer(teams: ParticipatingTeam[]): User {
  const gamesPlayed = teams.reduce(
    (prev, { historicResults }) => prev + historicResults.wins,
    0,
  );

  const startingTeam = getStarting(teams, 'cumulativeTeamId', gamesPlayed);

  return getStarting(
    startingTeam.players,
    'memorableId',
    Math.floor(gamesPlayed / teams.length),
  );
}

export function getStarting<T>(
  array: T[],
  sortKey: keyof T,
  gamesPlayed: number,
): T {
  return sortByProperty(array, sortKey)[
    (gamesPlayed + array.length) % array.length
  ];
}

export function hasOpenSlot(arr: GameTeam): boolean {
  return arr.some(item => item.playerDetails === undefined);
}

export function getAllPlayerIds(teams: GameTeam[]): string[] {
  return teams.flatMap(
    team =>
      filterFalsey(team, 'playerDetails').map(
        item => item.playerDetails?.memorableId,
      ) as string[],
  );
}

export function isPlayerInTeam(
  team: LoadingPlayer[],
  memorableId: string,
): boolean {
  return team.some(
    ({ playerDetails }) => playerDetails?.memorableId === memorableId,
  );
}

export function getNextTeamWithOpenSlot(teams: GameTeam[]): number {
  let shortest: number = Number.MAX_VALUE;
  let shortestIndex: number = Number.MAX_VALUE;

  for (let i = 0; i < teams.length; i++) {
    const team = teams[i];

    if (hasOpenSlot(team)) {
      if (team.length === 1) {
        return i;
      } else if (team.length < shortest) {
        shortest = team.length;
        shortestIndex = i;
      }
    }
  }

  return shortestIndex === Number.MAX_VALUE ? -1 : shortestIndex;
}

export function minimumRequirementsMet(
  teams: GameTeam[],
  { numberOfTeams, playersPerTeam }: GameRequirement,
) {
  return (
    teams.length >= numberOfTeams &&
    teams.every(
      team => filterFalsey(team, 'playerDetails').length >= playersPerTeam,
    )
  );
}
