import { Location } from 'schema';
import {
  ContextForResponseBody,
  FunctionName,
  HttpRequestForRequestParams,
} from '@src/types';
import { getLocationByUrl } from '@repository/locationRepository';
import {
  set200Response,
  set404Response,
  set500Response,
} from '@utils/contextUtils';
import { getFunctionLogger } from '@utils/logging';

const httpTrigger = async function (
  context: ContextForResponseBody<Location.GetLocationByUrl.ResponseBody>,
  req: HttpRequestForRequestParams<Location.GetLocationByUrl.RequestParams>,
): Promise<void> {
  const log = getFunctionLogger(FunctionName.GetLocation, context);

  const { urlPath } = req.params;

  log(`Finding Location by url ${urlPath}`);

  try {
    const location: Location = await getLocationByUrl(urlPath);

    if (!location) {
      log(`No matching location with urlPath: ${urlPath}`);
      set404Response(log, context);
    } else {
      log(`Found Location ${JSON.stringify(location)}`);
      set200Response(log, context, location);
    }
  } catch (e) {
    set500Response(log, context, e);
  }
};

export default httpTrigger;
