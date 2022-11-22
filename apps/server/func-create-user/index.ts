import { User } from 'schema';
import {
  ContextForResponseBody,
  FunctionName,
  HttpRequestForRequestBody,
  StatusCodes,
} from '../src/types';
import { setNotYetImplementedResponse } from '../src/utils/contextUtils';
import { getFunctionLogger } from '../src/utils/logging';

const httpTrigger = async function (
  context: ContextForResponseBody<User.CreateUser.ResponseBody>,
  req: HttpRequestForRequestBody<User.CreateUser.RequestBody>,
): Promise<void> {
  const log = getFunctionLogger(FunctionName.CreateUser, context);

  log('HTTP trigger function processed a request.');

  const userInput = req.body;

  log(JSON.stringify(userInput));

  setNotYetImplementedResponse(log, FunctionName.CreateUser, context);
};

export default httpTrigger;
