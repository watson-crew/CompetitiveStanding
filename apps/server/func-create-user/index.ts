import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { User, UserInput } from 'schema'
import {
    set201Response,
    set500Response,
  } from '../src/utils/contextUtils';
import { createUser } from '../src/repository/userRepository'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        const userInput: UserInput = req.body;
        const user: User = await createUser(userInput);
        set201Response(context, user);
    } catch (e) {
        context.log(`[func-create-user] Error: ${e.message}`)
        set500Response(context, e)
    }
};

export default httpTrigger;