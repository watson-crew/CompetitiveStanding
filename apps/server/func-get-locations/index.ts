import { operations, Location } from 'schema';
import { getLocations } from '../src/repository/locationRepository';
import { EmptyParameterAzureFunction } from '../src/types';
import { set200Response, set500Response } from '../src/utils/contextUtils';

const httpTrigger: EmptyParameterAzureFunction<
  operations['getAllLocations']
> = async function (context): Promise<void> {
    context.log(`[func-get-locations] Returning all locations`);

    try {
      const locations: Location[] = await getLocations();
      context.log(`[func-get-locations] Found ${locations.length} locations`);
      set200Response(context, locations);
    } catch (e) {
      context.log(`[func-get-location] Error: ${e.message}`);
      set500Response(context, e);
    }
  };

export default httpTrigger;
