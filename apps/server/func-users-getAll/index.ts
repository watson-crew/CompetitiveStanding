import { Users } from 'schema';
import { FunctionName, ContextForResponseBody } from '@src/types';
import { set200Response, set500Response } from '@utils/contextUtils';
import { getFunctionLogger } from '@utils/logging';
import { User } from 'database';
import { getUsers } from '@src/repository/userRepository';

const httpTrigger = async function (
  context: ContextForResponseBody<Users.GetAllUsers.ResponseBody>,
): Promise<void> {
  const log = getFunctionLogger(FunctionName.GetUsers, context);

  log('Returning all users');

  try {
    const users: User[] = await getUsers();
    log(`Found ${users.length} users`);
    set200Response(log, context, users);
  } catch (e) {
    set500Response(log, context, e);
  }
};

export default httpTrigger;
