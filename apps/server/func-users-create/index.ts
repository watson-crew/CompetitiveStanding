import { User } from 'schema';
import {
  ContextForNoContentResponse,
  FunctionName,
  HttpRequestForRequestBody,
} from '@src/types';
import { getFunctionLogger } from '@utils/logging';
import { createUser } from '@src/repository/userRepository';
import { set204Response, set500Response } from '@src/utils/contextUtils';

const httpTrigger = async function (
  context: ContextForNoContentResponse,
  req: HttpRequestForRequestBody<User.CreateUser.RequestBody>,
): Promise<void> {
  const log = getFunctionLogger(FunctionName.CreateUser, context);
  const userInput = req.body;

  log(JSON.stringify(userInput));

  try {
    const userCreated: boolean = await createUser(userInput);
    if (userCreated) {
      set204Response(log, context);
    } else {
      set500Response(log, context, new Error('Failed to create user'));
    }
  } catch (e) {
    context.log(`[func-create-user] Error: ${e.message}`);
    set500Response(log, context, e);
  }
};

export default httpTrigger;
