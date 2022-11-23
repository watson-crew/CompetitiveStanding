import { User } from 'schema';
import {
  ContextForNoContentResponse,
  FunctionName,
  HttpRequestForRequestBody,
} from '@src/types';
import { set204Response } from '@utils/contextUtils';
import { getFunctionLogger } from '@utils/logging';

const httpTrigger = async function (
  context: ContextForNoContentResponse,
  req: HttpRequestForRequestBody<User.CreateUser.RequestBody>,
): Promise<void> {
  const log = getFunctionLogger(FunctionName.CreateUser, context);

  log('HTTP trigger function processed a request.');

  const userInput = req.body;

  log(JSON.stringify(userInput));

  set204Response(log, context);
};

export default httpTrigger;
