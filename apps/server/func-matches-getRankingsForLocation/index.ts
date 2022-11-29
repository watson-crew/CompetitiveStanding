import { Matches, RankedPlayer } from 'schema';
import {
  ContextForResponseBody,
  FunctionName,
  HttpRequestForRequestBody,
} from '@src/types';
import { set200Response, set500Response } from '@utils/contextUtils';
import { getFunctionLogger } from '@src/utils/logging';
import { getUserByMemorableId } from '@src/repository/userRepository';
import { getRankingsForLocation } from '@src/repository/gameResultRepository';

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
    const rankings = await getRankingsForLocation(
      parseInt(locationId),
      parseInt(gameTypeId),
      parseInt(offset) || undefined,
      parseInt(total) || undefined,
    );

    log(`Found rankings`)
    set200Response(log, context, rankings);
  } catch (e) {
    set500Response(log, context, e)
  }
};

export default httpTrigger;
