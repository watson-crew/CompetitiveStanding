import { GetPlayerProfileByMemorableIdData, Player } from 'schema';
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
import { getUserByMemorableId } from '@src/repository/userRepository';
import { getResultsForPlayer } from '@src/repository/gameResultRepository';

const httpTrigger = async function (
  context: ContextForResponseBody<Player.GetPlayerProfileByMemorableId.ResponseBody>,
  req: HttpRequestForRequestParams<Player.GetPlayerProfileByMemorableId.RequestParams>,
): Promise<void> {
  const log = getFunctionLogger(FunctionName.GetPlayer, context);

  const { memorableId } = req.params;

  log(`[func-get-player] Got memorableId: ${memorableId}`);

  try {
    log(`Finding user by id ${memorableId}`);

    const user = await getUserByMemorableId(memorableId);
    const { resources, results } = await getResultsForPlayer(memorableId);

    if (!user) {
      log(`No matching user with id: ${memorableId}`);

      set404Response(log, context);
    } else {
      log(`Found user: ${user}`);

      const res: GetPlayerProfileByMemorableIdData = {
        player: {
          recentMatches: results,
          user,
        },
        resources,
      };

      set200Response(log, context, res);
    }
  } catch (e) {
    set500Response(log, context, e);
  }
};

export default httpTrigger;
