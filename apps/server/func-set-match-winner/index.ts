import { Matches } from 'schema';
import {
  ContextForNoContentResponse,
  HttpRequestForRequestBody,
  StatusCodes,
} from '../src/types';

const httpTrigger = async function (
  context: ContextForNoContentResponse,
  req: HttpRequestForRequestBody<Matches.SetMatchWinner.RequestBody>,
): Promise<void> {
  context.log('HTTP trigger function processed a request.');

  const { winningTeamId } = req.body;

  context.log(`[func-set-match-winner] Got winningTeamId: ${winningTeamId}`);

  context.res = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    body: {
      error: '[func-set-match-winner] Is not yet implemented',
    },
  };
};

export default httpTrigger;
