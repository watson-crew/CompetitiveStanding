import { Matches } from 'schema';
import {
  ContextForNoContentResponse,
  FunctionName,
  ParameterizedHttpRequest,
} from '@src/types';
import { set204Response, set500Response } from '@src/utils/contextUtils';
import { getFunctionLogger } from '@src/utils/logging';
import { updateGameResult } from '@src/repository/gameResultRepository';

const httpTrigger = async function (
  context: ContextForNoContentResponse,
  req: ParameterizedHttpRequest<
    Matches.RecordMatchResults.RequestParams,
    Matches.RecordMatchResults.RequestBody,
    never
  >,
): Promise<void> {
  const log = getFunctionLogger(FunctionName.RecordMatchResults, context);

  const { matchId } = req.params;
  const { winningTeamId } = req.body;

  log(`Triggered for matchId ${matchId}, winningTeamId ${winningTeamId}.`);

  const updateSuccessful = await updateGameResult(parseInt(matchId), {
    winningTeamId,
  });

  if (updateSuccessful) {
    set204Response(log, context);
  } else {
    set500Response(
      log,
      context,
      new Error('An error occurred updating the winning team'),
    );
  }
};

export default httpTrigger;
