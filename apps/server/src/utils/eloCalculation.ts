import {
  EloParameters as EloDifferentialParameters,
  RankedEntity,
  RankedTeam,
  TeamEloParameters,
} from '@src/types/rankings';

export const DEFAULT_ELO = 1200;

// Rating constants
const d = 400;
const k = 32;

const getExpectedOutcome = (rA: number, rB: number): number =>
  1 / (1 + Math.pow(10, (rB - rA) / d));

const getExpectedOutcomes = (
  ratings: RankedEntity[],
): Record<string, number> => {
  const expectedOutcomes: Record<string, number> = {};

  for (let i = 0; i < ratings.length; i++) {
    const rating = ratings[i];
    const expectedOutcomesForPlayer = [];

    for (let j = 0; j < ratings.length; j++) {
      if (j !== i) {
        expectedOutcomesForPlayer.push(
          getExpectedOutcome(rating.ranking, ratings[j].ranking),
        );
      }
    }

    expectedOutcomes[rating.id] = getTotalExpectedScore(
      expectedOutcomesForPlayer,
      ratings.length,
    );
  }

  return expectedOutcomes;
};

const getTotalExpectedScore = (
  expectedOutcomes: number[],
  n: number,
): number => {
  const outcomeSum = expectedOutcomes.reduce((prev, curr) => prev + curr, 0);
  console.log(outcomeSum);

  return outcomeSum / (n * (n - 1) * 0.5);
};

const getRatingDifferentials = (
  { expected, score }: EloDifferentialParameters,
  n: number,
): number => k * (n - 1) * (score - expected);

const parseTeamRatings = ({
  players,
  cumulativeTeamId,
}: RankedTeam): TeamEloParameters => {
  const totalRating = players.reduce((prev, curr) => prev + curr.ranking, 0);

  return {
    teamId: cumulativeTeamId,
    teamRating: totalRating / players.length,
    ratingShares: Object.fromEntries(
      players.map(rating => [rating.id, rating.ranking / totalRating]),
    ),
  };
};

const getUpdatedRankings = (
  teams: RankedTeam[],
  winningTeamId: string,
): Record<string, number> => {
  // Take the average elo and treat as if a single entity
  const teamEloParameters: Record<string, TeamEloParameters> =
    Object.fromEntries(
      teams.map(team => [team.cumulativeTeamId, parseTeamRatings(team)]),
    );

  const expectedOutcomes = getExpectedOutcomes(
    Object.values(teamEloParameters).map(({ teamId, teamRating }) => ({
      id: teamId,
      ranking: teamRating,
    })),
  );

  const ratingDifferentials = Object.fromEntries(
    Object.keys(teamEloParameters).map(teamId => [
      teamId,
      getRatingDifferentials(
        {
          expected: expectedOutcomes[teamId],
          score: winningTeamId === teamId ? 1 : 0,
        },
        teams.length,
      ),
    ]),
  );

  return Object.fromEntries(
    teams.flatMap(({ cumulativeTeamId: teamId, players }) => {
      const teamSize = players.length;

      return players.map(player => {
        const playerRatingProportion =
          teamEloParameters[teamId].ratingShares[player.id];

        const updatedRanking =
          player.ranking +
          ratingDifferentials[teamId] * teamSize * playerRatingProportion;

        return [player.id, updatedRanking] as [string, number];
      });
    }),
  );
};
