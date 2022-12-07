import { LoadingPlayer } from 'ui';
import { GameTeam } from '@src/types/games';
import { filterFalsey } from './collectionUtils';
import { GameRequirement } from 'schema';

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
