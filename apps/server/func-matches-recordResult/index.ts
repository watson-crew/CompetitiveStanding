import { Matches } from 'schema';
import {
  ContextForResponseBody,
  FunctionName,
  ParameterizedHttpRequest,
} from '@src/types';
import {
  set200Response,
  set400Response,
  set500Response,
} from '@src/utils/contextUtils';
import { getFunctionLogger } from '@src/utils/logging';
import {
  abandonMatch,
  updateGameResult,
} from '@src/repository/gameResultRepository';
import { updateElosForMatch } from '@src/repository/rankingsRepository';

const httpTrigger = async function (
  context: ContextForResponseBody<Matches.RecordMatchResults.ResponseBody>,
  req: ParameterizedHttpRequest<
    Matches.RecordMatchResults.RequestParams,
    Matches.RecordMatchResults.RequestBody,
    never
  >,
): Promise<void> {
  const log = getFunctionLogger(FunctionName.RecordMatchResults, context);

  const matchId = parseInt(req.params.matchId);
  const { updateType, updateDetails } = req.body;

  log(`Triggered for matchId ${matchId}, updateType ${updateType}.`);

  let successfulUpdatePromise: Promise<boolean>;
  let updatedElosPromise: Promise<Record<string, number>>;

  if (updateType === 'ABANDON_GAME') {
    successfulUpdatePromise = abandonMatch(matchId);
    updatedElosPromise = Promise.resolve({});
  } else if (updateType === 'SET_WINNER') {
    successfulUpdatePromise = updateGameResult(matchId, updateDetails);
    updatedElosPromise = updateElosForMatch(matchId, updateDetails);
  } else {
    set400Response(log, context);
    return;
  }

  const [successfulUpdate, updatedElos] = await Promise.all([
    successfulUpdatePromise,
    updatedElosPromise,
  ]);

  if (successfulUpdate) {
    set200Response(log, context, updatedElos);
  } else {
    set500Response(
      log,
      context,
      new Error('An error occurred updating the game result'),
    );
  }
};

export default httpTrigger;
