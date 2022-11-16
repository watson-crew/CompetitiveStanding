import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { getUserByMemorableId } from '../repository/userRepository';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
): Promise<void> {
  const { memorableId } = req.params;

  context.log(`[func-get-user] Finding user by id ${memorableId}`);

  let responseBody;

  try {
    const user = await getUserByMemorableId(memorableId);

    context.log(`[func-get-user] Found user ${JSON.stringify(user)}`);

    responseBody = user;
  } catch (e) {
    context.log(`[func-get-user] Error: ${e.message}`)
    responseBody = e.message;
  }


  context.res = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Content-Type': 'application/json',
    },
    body: responseBody,
  };
};

export default httpTrigger;
