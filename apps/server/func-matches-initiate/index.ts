import { Matches } from 'schema';
import {
  ContextForResponseBody,
  FunctionName,
  HttpRequestForRequestBody,
} from '@src/types';
import { set200Response } from '@utils/contextUtils';
import { getFunctionLogger } from '@src/utils/logging';

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

  const mockResponse: Matches.InitiateNewMatch.ResponseBody = {
    matchId: Math.ceil(Math.random() * 1000),
    historicResults: Object.fromEntries(
      participatingTeams.map(team => [
        team,
        { wins: Math.ceil(Math.random() * 25) },
      ]),
    ),
  };

  set200Response(log, context, mockResponse);
};

export default httpTrigger;
