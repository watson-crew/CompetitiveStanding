import { GetRecentMatchesByMemorableIdData, Player } from 'schema';
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
import { getResultsForPlayer } from '@src/repository/gameResultRepository';

const httpTrigger = async function (
  context: ContextForResponseBody<Player.GetRecentMatchesByMemorableId.ResponseBody>,
  req: HttpRequestForRequestParams<Player.GetRecentMatchesByMemorableId.RequestParams>,
): Promise<void> {
  const log = getFunctionLogger(FunctionName.GetPlayerMatches, context);

  const { memorableId } = req.params;

  log(`[func-get-player-matches] Got memorableId: ${memorableId}`);

  try {
    log(`Finding player matches by id ${memorableId}`);

    const { resources, results } = await getResultsForPlayer(memorableId);

    if (!results) {
      log(`No player matches with id: ${memorableId}`);

      set404Response(log, context);
    } else {
      log(`Found player matches: ${results}`);

      const res: GetRecentMatchesByMemorableIdData = {
        results,
        resources,
      };

      set200Response(log, context, res);
    }
  } catch (e) {
    set500Response(log, context, e);
  }
};

export default httpTrigger;
