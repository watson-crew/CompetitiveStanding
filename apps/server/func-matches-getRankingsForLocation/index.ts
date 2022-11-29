import { Matches, RankedPlayer } from 'schema';
import {
  ContextForResponseBody,
  FunctionName,
  HttpRequestForRequestBody,
} from '@src/types';
import { set200Response, set500Response } from '@utils/contextUtils';
import { getFunctionLogger } from '@src/utils/logging';
import { getUserByMemorableId } from '@src/repository/userRepository';

const httpTrigger = async function (
  context: ContextForResponseBody<Matches.GetRankingsForLocation.ResponseBody>,
  req: HttpRequestForRequestBody<Matches.GetRankingsForLocation.RequestQuery>,
): Promise<void> {
  const log = getFunctionLogger(FunctionName.GetRankingsForLocation, context);

  log('HTTP trigger function processed a request.');

  const { gameTypeId, locationId, offset, total } = req.query;

  log(`Got gameTypeId: ${gameTypeId}`);
  log(`Got locationId: ${locationId}`);
  log(`Got offset: ${offset}`);
  log(`Got total: ${total}`);

  try {
    const josh = await getUserByMemorableId('jjp')
    const rankings: RankedPlayer[] = [{
      player: josh,
      gamesPlayed: 1,
      wins: 1
    }];
    log(`Found rankings`)
    set200Response(log, context, rankings);
  } catch (e) {
    set500Response(log, context, e)
  }
};

export default httpTrigger;
