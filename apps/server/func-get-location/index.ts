import { operations, Location } from 'schema';
import { PathParameterAzureFunction } from '../src/types';
import { getLocationById } from '../src/repository/locationRepository';
import { set200Response, set404Response, set500Response } from '../src/utils/contextUtils';

const httpTrigger: PathParameterAzureFunction<
  operations['getLocationById']
> = async function (context, req): Promise<void> {
    let { locationId } = req.params;
    locationId = +locationId; // Hack to turn string into number


    context.log(`[func-get-location] Finding Location by id ${locationId}`);

    try {
      const location: Location = await getLocationById(locationId);

      if (!location) {
        context.log(`[func-get-location] No matching location with id: ${locationId}`);
        set404Response(context);
      } else {
        context.log(`[func-get-location] Found Location ${JSON.stringify(location)}`);
        set200Response(context, location);
      }
    } catch (e) {
      context.log(`[func-get-location] Error: ${e.message}`);
      set500Response(context, e);
    }
  };

export default httpTrigger;
