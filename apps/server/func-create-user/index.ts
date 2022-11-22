import { User } from 'schema';
import {
  ContextForResponseBody,
  HttpRequestForRequestBody,
  StatusCodes,
} from '../src/types';

const httpTrigger = async function (
  context: ContextForResponseBody<User.CreateUser.ResponseBody>,
  req: HttpRequestForRequestBody<User.CreateUser.RequestBody>,
): Promise<void> {
  context.log('HTTP trigger function processed a request.');

  const userInput = req.body;

  context.log(userInput);

  context.res = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    body: {
      error: 'Not yet implemented',
    },
  };
};

export default httpTrigger;
