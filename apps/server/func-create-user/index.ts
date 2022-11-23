import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { User, UserInput } from 'schema'
import {
    set204Response,
    set500Response,
  } from '../src/utils/contextUtils';
import { createUser } from '../src/repository/userRepository'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        const userInput: UserInput = req.body;
        const userCreated: boolean = await createUser(userInput);
        set204Response(context);
    } catch (e) {
        context.log(`[func-create-user] Error: ${e.message}`)
        set500Response(context, e)
    }
};

export default httpTrigger;