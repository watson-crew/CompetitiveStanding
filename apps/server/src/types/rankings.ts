export type RankedEntity = {
  id: string;
  ranking: number;
};

export type RankedTeam = {
  cumulativeTeamId: string;
  players: RankedEntity[];
};

export type TeamEloParameters = {
  teamId: string;
  teamRating: number;
  /* The percentage of the total elo the person contributes */
  ratingShares: Record<string, number>;
};

export type EloParameters = {
  expected: number;
  score: number;
};
