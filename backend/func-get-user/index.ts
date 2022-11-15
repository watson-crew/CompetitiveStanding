import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import users from "../src/db/userDb";

const httpTrigger: AzureFunction = async function (
  context: Context,
  _req: HttpRequest
): Promise<void> {
  const { memorableId } = context.bindingData;

  context.log(`[func-get-user] Finding user by id ${memorableId}`);

  const user = users.find((user) => user.memorableId === memorableId);

  context.log(`[func-get-user] Found user ${JSON.stringify(user)}`);

  context.res = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Content-Type": "application/json",
    },
    body: user,
  };
};

export default httpTrigger;
