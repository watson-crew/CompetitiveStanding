import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { User } from 'schema'
import {
    set201Response,
    set500Response,
  } from '../src/utils/contextUtils';
import { createUser } from '../src/repository/userRepository'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    // Is the return type of this the same as the input type?
    // Do we have a type definition in schema for the post details?
    try {
        // Should map schema models to repository models
        //   OR assume schema models are the same as repository models
        // Then in repository map to prisma models
        const user: User = await createUser(req.body);
        set201Response(context, user);
    } catch (e) {
        context.log(`[func-create-user] Error: ${e.message}`)
        set500Response(context, e)
    }
};

export default httpTrigger;