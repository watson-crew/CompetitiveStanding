import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import users from '../src/db/userDb';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
): Promise<void> {
  const { memorableId } = req.params;

  context.log(`[func-get-user] Finding user by id ${memorableId}`);

  const user = users.find(user => user.memorableId === memorableId);

  context.log(`[func-get-user] Found user ${JSON.stringify(user)}`);

  try {
    const isOdd = require('is-odd');
    context.log(isOdd('2'));

    context.res = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Content-Type': 'application/json',
      },
      body: user,
    };
  } catch (err) {
    context.log(err);

    context.res = {
      status: 500,
      body: JSON.stringify(err),
    };
  }
};

export default httpTrigger;
