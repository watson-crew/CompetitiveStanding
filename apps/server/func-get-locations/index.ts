import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import locations from '../src/db/locationDb';

const httpTrigger: AzureFunction = async function (
  context: Context,
  _req: HttpRequest,
): Promise<void> {
  context.log(`[func-get-locations] Returning all locations`);

  context.log(`[func-get-locations] Found ${locations.length} locations`);

  context.res = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Content-Type': 'application/json',
    },
    body: locations,
  };
};

export default httpTrigger;
