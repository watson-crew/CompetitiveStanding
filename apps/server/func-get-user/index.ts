import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { return200, return404, return500 } from '../lib/utils';
import { getUserByMemorableId } from '../repository/userRepository';

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
