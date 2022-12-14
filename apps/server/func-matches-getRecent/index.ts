import { Matches } from 'schema';
import {
  FunctionName,
  ContextForResponseBody,
  HttpRequestForQueryParams,
} from '@src/types';
import { set200Response, set500Response } from '@utils/contextUtils';
import { getFunctionLogger } from '@utils/logging';
import { getResultsForLocation } from '@repository/gameResultRepository';

const httpTrigger = async function (
  context: ContextForResponseBody<Matches.GetRecentMatches.ResponseBody>,
  req: HttpRequestForQueryParams<Matches.GetRecentMatches.RequestQuery>,
): Promise<void> {
  const { locationId, offset, total } = req.query;

  const log = getFunctionLogger(FunctionName.GetLocations, context);

  log(`Returning recent matches for location '${locationId}'`);

  try {
    const recentMatches = await getResultsForLocation(
      parseInt(locationId),
      parseInt(offset) || undefined,
      parseInt(total) || undefined,
    );

    log(`Found ${recentMatches.results.length} locations`);
    set200Response(log, context, recentMatches);
  } catch (e) {
    set500Response(log, context, e);
  }
};

export default httpTrigger;
