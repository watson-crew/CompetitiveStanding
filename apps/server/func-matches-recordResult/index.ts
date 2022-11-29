import { Matches, RecordMatchResultsPayloadUpdateType } from 'schema';
import {
  ContextForNoContentResponse,
  FunctionName,
  ParameterizedHttpRequest,
} from '@src/types';
import {
  set204Response,
  set400Response,
  set500Response,
} from '@src/utils/contextUtils';
import { getFunctionLogger } from '@src/utils/logging';
import {
  abandonMatch,
  updateGameResult,
} from '@src/repository/gameResultRepository';

const httpTrigger = async function (
  context: ContextForNoContentResponse,
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

  let updateSuccessful: Promise<boolean>;

  if (updateType === RecordMatchResultsPayloadUpdateType.ABANDON_GAME) {
    updateSuccessful = abandonMatch(matchId);
  } else if (updateType === RecordMatchResultsPayloadUpdateType.SET_WINNER) {
    updateSuccessful = updateGameResult(matchId, updateDetails);
  } else {
    set400Response(log, context);
    return;
  }

  if (await updateSuccessful) {
    set204Response(log, context);
  } else {
    set500Response(
      log,
      context,
      new Error('An error occurred updating the game result'),
    );
  }
};

export default httpTrigger;
