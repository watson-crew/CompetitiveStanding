/* eslint-disable @typescript-eslint/no-explicit-any */
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
  getMostLostAgainst,
  getMostWinsAgainst,
} from '@src/repository/playerRepository';

const httpTrigger = async function (
  context: ContextForResponseBody<any>,
  req: HttpRequestForRequestParams<any>,
): Promise<void> {
  const log = getFunctionLogger(FunctionName.GetPlayerStats, context);

  const { memorableId } = req.params;

  log(`[func-get-player-stats] Got memorableId: ${memorableId}`);

  try {
    log(`Finding player stats by id ${memorableId}`);

    const test = await getMostLostAgainst(memorableId);
    log(test);

    if (!test) {
      log(`No player stats with id: ${memorableId}`);

      set404Response(log, context);
    } else {
      log(`Found player stats: ${test}`);

      set200Response(log, context, test);
    }
  } catch (e) {
    set500Response(log, context, e);
  }
};

export default httpTrigger;
