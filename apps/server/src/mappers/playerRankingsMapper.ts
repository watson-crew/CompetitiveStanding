import { GetTeamPlayerRankingsResult, GetTeamRankingsResult } from '@src/types';
import { RankedEntity, RankedTeam } from '@src/types/rankings';
import { DEFAULT_ELO } from '@src/utils/eloCalculation';
import { Mapper } from './generics';

export const TeamRankingsMapper: Mapper<
  GetTeamPlayerRankingsResult[],
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

export const RankedTeamMapper: Mapper<GetTeamRankingsResult, RankedTeam> = {
  map: ({ cumulativeTeamId, players }) => {
    return {
      cumulativeTeamId,
      players: players.map(({ memorableId, ranking }) => {
        if (!ranking.length) {
          throw new Error(`No existing Elo for ${memorableId}`);
        }

        return {
          id: memorableId,
          ranking: ranking[0].elo,
        } as RankedEntity;
      }),
    } as RankedTeam;
  },
};
