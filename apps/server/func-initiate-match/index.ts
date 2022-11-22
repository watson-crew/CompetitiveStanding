import { operations } from 'schema';
import { PostRequestAzureFunction } from '../src/types';

const httpTrigger: PostRequestAzureFunction<operations['initiateNewMatch']> =
  async function (context, req): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    const { gameTypeId, locationId, participatingTeams } = req.body;

    context.log(`[func-initiate-match] Got gameTypeId: ${gameTypeId}`);
    context.log(`[func-initiate-match] Got locationId: ${locationId}`);
    context.log(
      `[func-initiate-match] Got participatingTeams: ${participatingTeams}`,
    );

    context.res = {
      statusCode: 500,
      body: {
        message: '[func-initiate-match] Is not yet implemented',
      },
    };
  };

export default httpTrigger;
