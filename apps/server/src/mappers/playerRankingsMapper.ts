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
        players.map(({ memorableId, rankings }) => [
          memorableId,
          rankings.length ? rankings[0].elo : DEFAULT_ELO,
        ]),
      ),
      playersMissingElos: players
        .filter(({ rankings }) => !rankings.length)
        .map(({ memorableId }) => memorableId),
    };
  },
};

export const RankedTeamMapper: Mapper<GetTeamRankingsResult, RankedTeam> = {
  map: ({ cumulativeTeamId, players }) => {
    return {
      cumulativeTeamId,
      players: players.map(({ memorableId, rankings }) => {
        if (!rankings.length) {
          throw new Error(`No existing Elo for ${memorableId}`);
        }

        return {
          id: memorableId,
          ranking: rankings[0].elo,
        } as RankedEntity;
      }),
    } as RankedTeam;
  },
};
