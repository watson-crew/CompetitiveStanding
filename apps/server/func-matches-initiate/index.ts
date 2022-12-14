import { Matches } from 'schema';
import {
  ContextForResponseBody,
  FunctionName,
  HttpRequestForRequestBody,
} from '@src/types';
import { set200Response, set500Response } from '@utils/contextUtils';
import { getFunctionLogger } from '@src/utils/logging';
import { initiateNewMatch } from '@src/repository/gameResultRepository';
import { getParticipantElos } from '@src/repository/rankingsRepository';

const httpTrigger = async function (
  context: ContextForResponseBody<Matches.InitiateNewMatch.ResponseBody>,
  req: HttpRequestForRequestBody<Matches.InitiateNewMatch.RequestBody>,
): Promise<void> {
  const log = getFunctionLogger(FunctionName.InitiateMatch, context);

  const { gameTypeId, locationId, participatingTeams } = req.body;

  log(
    `Triggered with gameTypeId: ${gameTypeId}, locationId: ${locationId}, participatingTeams: ${participatingTeams}`,
  );

  try {
    const initiatedMatch = await initiateNewMatch(
      gameTypeId,
      locationId,
      participatingTeams,
    );

    const playerRatings = await getParticipantElos(
      gameTypeId,
      participatingTeams,
    );

    set200Response(log, context, { ...initiatedMatch, playerRatings });
  } catch (err) {
    set500Response(log, context, err);
  }
};

export default httpTrigger;
