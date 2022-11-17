import { User, operations } from 'schema';
import locations from '../src/db/locationDb';
import users from '../src/db/userDb';
import { ParameterizedAzureFunction } from '../src/types';

const httpTrigger: ParameterizedAzureFunction<
  operations['getUserByMemorableId']
> = async function (context, req): Promise<void> {
  const { memorableId } = req.params;

  context.log(`[func-get-user] Finding user by id ${memorableId}`);

  const user = users.find(user => user.memorableId === memorableId);

  if (!user) {
    context.res = {
      statusCode: 404,
    };
    return;
  }

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
