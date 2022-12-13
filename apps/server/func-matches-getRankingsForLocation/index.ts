import { Matches } from 'schema';
import {
  ContextForResponseBody,
  FunctionName,
  HttpRequestForQueryParams,
} from '@src/types';
import {
  set200Response,
  set400Response,
  set500Response,
} from '@utils/contextUtils';
import { getFunctionLogger } from '@src/utils/logging';
import { getTopRankingsForLocation as getRankingsForLocation } from '@src/repository/gameResultRepository';
import { unpackArray } from '@src/utils/requestUtils';

const httpTrigger = async function (
  context: ContextForResponseBody<Matches.GetRankingsForLocation.ResponseBody>,
  req: HttpRequestForQueryParams<Matches.GetRankingsForLocation.RequestQuery>,
): Promise<void> {
  const log = getFunctionLogger(FunctionName.GetRankingsForLocation, context);

  log('HTTP trigger function processed a request.');

  const { gameTypeId, locationId, offset, total } = req.query;

  const filterTypes = unpackArray(req.query, 'filterTypes');

  if (!filterTypes?.length) {
    set400Response(log, context);
    return;
  }

  log(`Got gameTypeId: ${gameTypeId}`);
  log(`Got locationId: ${locationId}`);
  log(`Got offset: ${offset}`);
  log(`Got total: ${total}`);
  log(`Got filterTypes: ${filterTypes}`);

  try {
    const rankings = await getRankingsForLocation(
      parseInt(locationId),
      parseInt(gameTypeId),
      parseInt(offset) || undefined,
      parseInt(total) || undefined,
      filterTypes,
    );

    log(`Found rankings`);
    set200Response(log, context, rankings);
  } catch (e) {
    set500Response(log, context, e);
  }
};

export default httpTrigger;
