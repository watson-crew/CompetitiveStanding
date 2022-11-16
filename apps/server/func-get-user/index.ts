import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { User } from 'schema/api';
import locations from '../src/db/locationDb';
import users from '../src/db/userDb';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
): Promise<void> {
  const { memorableId } = req.params;

  context.log(`[func-get-user] Finding user by id ${memorableId}`);

  const user = users.find(user => user.memorableId === memorableId);

  const locationName = locations.find(
    location => location.id === user.homeLocation,
  ).name;

  context.log(`[func-get-user] Found user ${JSON.stringify(user)}`);

  context.res = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Content-Type': 'application/json',
    },
    body: {
      ...user,
      location: locationName,
    } as User,
  };
};

export default httpTrigger;
