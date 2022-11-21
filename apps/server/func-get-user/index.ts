import { operations, User } from 'schema';
import { PathParameterAzureFunction } from '../src/types';
import {
  set200Response,
  set404Response,
  set500Response,
} from '../src/utils/contextUtils';
import { getUserByMemorableId } from '../src/repository/userRepository';

const httpTrigger: PathParameterAzureFunction<
  operations['getUserByMemorableId']
> = async function (context, req): Promise<void> {
  const { memorableId } = req.params;

  context.log(`[func-get-user] Got memorableId: ${memorableId}`);

  try {
    context.log(`[func-get-user] Finding user by id ${memorableId}`);

    const user: User = await getUserByMemorableId(memorableId);

    if (!user) {
      context.log(`[func-get-user] No matching user with id: ${memorableId}`);
      set404Response(context);
    } else {
      context.log(`[func-get-user] Found user: ${user}`);
      set200Response(context, user);
    }
  } catch (e) {
    context.log(`[func-get-user] Error: ${e.message}`);
    set500Response(context, e);
  }
};

export default httpTrigger;
