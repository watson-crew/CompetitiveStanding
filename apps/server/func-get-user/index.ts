import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { getUserByMemorableId } from '../repository/userRepository';

// Have some utils to encapsulate default headers & setting responses in the context
const defaultHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET',
  'Content-Type': 'application/json',
};

const return404 = (context: Context) => {
  context.res = {
    headers: defaultHeaders,
    statusCode: 404,
  };
};

const return200 = (context: Context, body: any) => {
  context.res = {
    headers: defaultHeaders,
    statusCode: 200,
    body,
  };
};

const return500 = (context: Context, error: Error) => {
  context.res = {
    headers: defaultHeaders,
    statusCode: 500,
    body: error.message,
  };
};

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
): Promise<void> {
  context.log(`[func-get-user] Function called, getting memorableId`);
  const { memorableId } = req.params;

  context.log(`[func-get-user] Got memorableId: ${memorableId}`);

  try {
    context.log(`[func-get-user] Finding user by id ${memorableId}`);

    const user = await getUserByMemorableId(memorableId);

    if (!user) {
      context.log(`[func-get-user] No matching user with id: ${memorableId}`);
      return404(context);
    } else {
      context.log(`[func-get-user] Found user: ${user}`);
      return200(context, user);
    }
  } catch (e) {
    context.log(`[func-get-user] Error: ${e.message}`);
    return500(context, e);
  }
};

export default httpTrigger;
