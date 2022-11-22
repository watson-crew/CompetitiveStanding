import { Location } from 'schema';
import { getLocations } from '../src/repository/locationRepository';
import { FunctionName } from '../src/types';
import { ContextForResponseBody } from '../src/types/responses';
import { set200Response, set500Response } from '../src/utils/contextUtils';
import { getFunctionLogger } from '../src/utils/logging';

const httpTrigger = async function (
  context: ContextForResponseBody<Location.GetAllLocations.ResponseBody>,
): Promise<void> {
  const log = getFunctionLogger(FunctionName.GetLocations, context);

  log('Returning all locations');

  try {
    const locations: Location[] = await getLocations();
    log(`Found ${locations.length} locations`);
    set200Response(log, context, locations);
  } catch (e) {
    set500Response(log, context, e);
  }
};

export default httpTrigger;
