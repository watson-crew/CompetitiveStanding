import { Matches } from 'schema';
import {
  ContextForNoContentResponse,
  FunctionName,
  HttpRequestForRequestBody,
} from '@src/types';
import { set204Response } from '@src/utils/contextUtils';
import { getFunctionLogger } from '@src/utils/logging';

const httpTrigger = async function (
  context: ContextForNoContentResponse,
  req: HttpRequestForRequestBody<Matches.RecordMatchResults.RequestBody>,
): Promise<void> {
  const log = getFunctionLogger(FunctionName.RecordMatchResults, context);

  log('HTTP trigger function processed a request.');

  const { winningTeamId } = req.body;

  log(`Got winningTeamId: ${winningTeamId}`);

  set204Response(log, context);
};

export default httpTrigger;
