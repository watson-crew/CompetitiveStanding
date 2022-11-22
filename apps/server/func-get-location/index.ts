import { Location } from 'schema';
import {
  ContextForResponseBody,
  FunctionName,
  HttpRequestForRequestParams,
} from '../src/types';
import { getLocationById } from '../src/repository/locationRepository';
import {
  set200Response,
  set404Response,
  set500Response,
} from '../src/utils/contextUtils';
import { getFunctionLogger } from '../src/utils/logging';

const httpTrigger = async function (
  context: ContextForResponseBody<Location.GetLocationById.ResponseBody>,
  req: HttpRequestForRequestParams<Location.GetLocationById.RequestParams>,
): Promise<void> {
  const log = getFunctionLogger(FunctionName.GetLocation, context);

  const locationId = parseInt(req.params.locationId);

  log(`Finding Location by id ${locationId}`);

  try {
    const location: Location = await getLocationById(locationId);

    if (!location) {
      log(`No matching location with id: ${locationId}`);
      set404Response(log, context);
    } else {
      context.log(
        `[func-get-location] Found Location ${JSON.stringify(location)}`,
      );
      set200Response(log, context, location);
    }
  } catch (e) {
    set500Response(log, context, e);
  }
};

export default httpTrigger;
