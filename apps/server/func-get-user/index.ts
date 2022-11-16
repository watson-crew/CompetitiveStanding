import { AzureFunction, Context, HttpRequest } from '@azure/functions';
// import { getUserByMemorableId } from '../repository/userRepository';
import { PrismaClient } from '@prisma/client';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
): Promise<void> {
  context.log(`[func-get-user] Function called, getting memorableId`);
  const { memorableId } = req.params;

  context.log(`[func-get-user] Got memorableId: ${memorableId}`);

  let responseBody;

  try {
    context.log(`[func-get-user] Creating prisma client`);
    const prisma = new PrismaClient()

    context.log(`[func-get-user] Finding user by id ${memorableId}`);

    //const user = await getUserByMemorableId(memorableId);
    const user = await prisma.user.findFirst({
      where: {
          memorableId
      }
    })
    // const user = {
    //   id: 1,
    //   content: "test"
    // }

    context.log(`[func-get-user] Found user ${JSON.stringify(user)}`);

    responseBody = user;
  } catch (e) {
    context.log(`[func-get-user] Error: ${e.message}`)
    responseBody = e.message;
  }


  context.res = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Content-Type': 'application/json',
    },
    body: responseBody,
  };
};

export default httpTrigger;
