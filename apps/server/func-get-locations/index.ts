import { operations } from 'schema';
import locations from '../src/db/locationDb';
import { EmptyParameterAzureFunction } from '../src/types';

const httpTrigger: EmptyParameterAzureFunction<operations['getAllLocations']> =
  async function (context): Promise<void> {
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
