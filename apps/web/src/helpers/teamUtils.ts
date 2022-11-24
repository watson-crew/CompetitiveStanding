import { User } from 'schema';

export function generateTeamId(teamMembers: User[]): string {
  return teamMembers
    .map(user => user.memorableId)
    .sort()
    .join('');
}

export function extractPlayerIds(teamId: string): string[] {
  if (teamId.length % 3 !== 0) throw new Error();

  return teamId.match(/.{3}/g)!;
}
