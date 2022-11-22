import { User } from 'schema';
import {
  set200Response,
  set404Response,
  set500Response,
} from '../src/utils/contextUtils';
import { getUserByMemorableId } from '../src/repository/userRepository';
import {
  ContextForResponseBody,
  FunctionName,
  HttpRequestForRequestParams,
} from '../src/types/';
import { getFunctionLogger, logForFunction } from '../src/utils/logging';

const functionName = FunctionName.GetUser;

const httpTrigger = async function (
  context: ContextForResponseBody<User.GetUserByMemorableId.ResponseBody>,
  req: HttpRequestForRequestParams<User.GetUserByMemorableId.RequestParams>,
): Promise<void> {
  const log = getFunctionLogger(FunctionName.GetUser, context);

  const { memorableId } = req.params;

  context.log(`[func-get-user] Got memorableId: ${memorableId}`);

  try {
    log(`Finding user by id ${memorableId}`);

    const user: User = await getUserByMemorableId(memorableId);

    if (!user) {
      log(`No matching user with id: ${memorableId}`);

      set404Response(log, context);
    } else {
      log(`Found user: ${user}`);
      set200Response(log, context, user);
    }
  } catch (e) {
    set500Response(log, context, e);
  }
};

export default httpTrigger;
