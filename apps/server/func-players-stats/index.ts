import { GetStatsByMemorableIdData, Player } from 'schema';
import {
  set200Response,
  set404Response,
  set500Response,
} from '@utils/contextUtils';
import {
  ContextForResponseBody,
  FunctionName,
  HttpRequestForRequestParams,
} from '@src/types';
import { getFunctionLogger } from '@utils/logging';
import {
  getMostLostTo,
  getMostWinsAgainst,
  getPlayerBaseStats,
  getPlayerBestFriend,
} from '@src/repository/playerRepository';

const httpTrigger = async function (
  context: ContextForResponseBody<Player.GetStatsByMemorableId.ResponseBody>,
  req: HttpRequestForRequestParams<Player.GetStatsByMemorableId.RequestParams>,
): Promise<void> {
  const log = getFunctionLogger(FunctionName.GetPlayerMatches, context);

  const { memorableId } = req.params;

  log(`[func-get-player-stats] Got memorableId: ${memorableId}`);

  try {
    log(`Finding player stats by id ${memorableId}`);

    const [baseStats, bestFriend, easyPickings, nemesis] = await Promise.all([
      getPlayerBaseStats(memorableId),
      getPlayerBestFriend(memorableId),
      getMostWinsAgainst(memorableId),
      getMostLostTo(memorableId),
    ]);

    if (!baseStats && !bestFriend && !easyPickings && !nemesis) {
      log(`No player stats found for memorableId: ${memorableId}`);
      set404Response(log, context);
    } else {
      const { gamesPlayed, gamesWon, winPercentage } = baseStats;
      log(
        `Found player stats: Games played-${gamesPlayed}, Games won-${gamesWon}, Win percentage-${winPercentage}`,
      );

      const res: GetStatsByMemorableIdData = {
        gamesPlayed,
        gamesWon,
        winPercentage,
        bestFriend,
        easyPickings,
        nemesis,
      };

      set200Response(log, context, res);
    }
  } catch (e) {
    set500Response(log, context, e);
  }
};

export default httpTrigger;
