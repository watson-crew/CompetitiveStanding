import { User } from 'schema';
import {
  ContextForResponseBody,
  FunctionName,
  HttpRequestForRequestBody,
  StatusCodes,
} from '../src/types';
import { getFunctionLogger } from '../src/utils/logging';

const httpTrigger = async function (
  context: ContextForResponseBody<User.CreateUser.ResponseBody>,
  req: HttpRequestForRequestBody<User.CreateUser.RequestBody>,
): Promise<void> {
  const log = getFunctionLogger(FunctionName.CreateUser, context);

  log('HTTP trigger function processed a request.');

  const userInput = req.body;

  log(JSON.stringify(userInput));

  context.res = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    body: {
      error: 'Not yet implemented',
    },
  };
};

export default httpTrigger;
