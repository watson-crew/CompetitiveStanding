import { Matches } from 'schema';
import {
  ContextForResponseBody,
  FunctionName,
  HttpRequestForRequestBody,
} from '../src/types';
import { setNotYetImplementedResponse } from '../src/utils/contextUtils';
import { getFunctionLogger } from '../src/utils/logging';

const httpTrigger = async function (
  context: ContextForResponseBody<Matches.InitiateNewMatch.ResponseBody>,
  req: HttpRequestForRequestBody<Matches.InitiateNewMatch.RequestBody>,
): Promise<void> {
  const log = getFunctionLogger(FunctionName.InitiateMatch, context);

  log('HTTP trigger function processed a request.');

  const { gameTypeId, locationId, participatingTeams } = req.body;

  log(`Got gameTypeId: ${gameTypeId}`);
  log(`Got locationId: ${locationId}`);
  log(`Got participatingTeams: ${participatingTeams}`);

  setNotYetImplementedResponse(log, FunctionName.InitiateMatch, context);
};

export default httpTrigger;
