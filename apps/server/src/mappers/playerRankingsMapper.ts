import { GetTeamRankingsResult } from '@src/types';
import { DEFAULT_ELO } from '@src/utils/eloCalculation';
import { Mapper } from './generics';

export const TeamRankingsMapper: Mapper<
  GetTeamRankingsResult[],
  { elos: Record<string, number>; playersMissingElos: string[] }
> = {
  map: rankings => {
    const players = rankings.flatMap(ranking => ranking.players);

    return {
      elos: Object.fromEntries(
        players.map(({ memorableId, ranking }) => [
          memorableId,
          ranking.length ? ranking[0].elo : DEFAULT_ELO,
        ]),
      ),
      playersMissingElos: players
        .filter(({ ranking }) => !ranking.length)
        .map(({ memorableId }) => memorableId),
    };
  },
};
