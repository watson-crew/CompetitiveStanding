import { Location } from 'schema';
import { getLocations } from '@repository/locationRepository';
import { FunctionName, ContextForResponseBody } from '@src/types';
import { set200Response, set500Response } from '@utils/contextUtils';
import { getFunctionLogger } from '@utils/logging';

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
