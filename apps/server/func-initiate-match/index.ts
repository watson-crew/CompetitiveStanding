import { Matches } from 'schema';
import {
  ContextForResponseBody,
  HttpRequestForRequestBody,
  StatusCodes,
} from '../src/types';

const httpTrigger = async function (
  context: ContextForResponseBody<Matches.InitiateNewMatch.ResponseBody>,
  req: HttpRequestForRequestBody<Matches.InitiateNewMatch.RequestBody>,
): Promise<void> {
  context.log('HTTP trigger function processed a request.');

  const { gameTypeId, locationId, participatingTeams } = req.body;

  context.log(`[func-initiate-match] Got gameTypeId: ${gameTypeId}`);
  context.log(`[func-initiate-match] Got locationId: ${locationId}`);
  context.log(
    `[func-initiate-match] Got participatingTeams: ${participatingTeams}`,
  );

  context.res = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    body: {
      error: '[func-initiate-match] Is not yet implemented',
    },
  };
};

export default httpTrigger;
