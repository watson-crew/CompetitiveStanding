import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { getUserByMemorableId } from '../repository/userRepository';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
): Promise<void> {
  const { memorableId } = req.params;

  context.log(`[func-get-user] Finding user by id ${memorableId}`);

  const user = await getUserByMemorableId(memorableId);

  context.log(`[func-get-user] Found user ${JSON.stringify(user)}`);

  context.res = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Content-Type': 'application/json',
    },
    body: user,
  };
};

export default httpTrigger;
