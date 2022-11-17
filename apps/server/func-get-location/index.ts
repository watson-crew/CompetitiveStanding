import { operations } from 'schema';
import locations from '../src/db/locationDb';
import { PathParameterAzureFunction } from '../src/types';

const httpTrigger: PathParameterAzureFunction<operations['getLocationById']> =
  async function (context, req): Promise<void> {
    const { locationId } = req.params;

    context.log(`[func-get-location] Finding Location by id ${locationId}`);

    const location = locations.find(location => location.id === locationId);

    context.log(
      `[func-get-location] Found Location ${JSON.stringify(location)}`,
    );

    context.res = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Content-Type': 'application/json',
      },
      body: location,
    };
  };

export default httpTrigger;
