import { operations } from 'schema';
import locations from '../src/db/locationDb';
import users from '../src/db/userDb';
import { PathParameterAzureFunction } from '../src/types';
import { return200, return404, return500 } from '../lib/utils';
import { getUserByMemorableId } from '../repository/userRepository';

const httpTrigger: PathParameterAzureFunction<
  operations['getUserByMemorableId']
> = async function (context, req): Promise<void> {
  const { memorableId } = req.params;

  context.log(`[func-get-user] Got memorableId: ${memorableId}`);

  try {
    context.log(`[func-get-user] Finding user by id ${memorableId}`);

    const user = await getUserByMemorableId(memorableId);

    if (!user) {
      context.log(`[func-get-user] No matching user with id: ${memorableId}`);
      return404(context);
    } else {
      context.log(`[func-get-user] Found user: ${user}`);

      const homeLocationId =
        user.homeLocation || '833bdc4a-5c98-40cb-ac94-9a48aecdf5e2';

      const locationName = locations.find(
        location => location.id === homeLocationId,
      ).name;
      return200(context, { ...user, location: locationName });
    }
  } catch (e) {
    context.log(`[func-get-user] Error: ${e.message}`);
    return500(context, e);
  }
};

export default httpTrigger;
