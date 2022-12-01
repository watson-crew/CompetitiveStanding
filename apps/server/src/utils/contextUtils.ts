import { FunctionName, StatusCodes } from '../types';
import {
  ContextForNoContentResponse,
  ContextForResponse as ErrorContext,
  ContextForResponseBody,
} from '../types/responses';
import { Logger } from './logging';

// Have some utils to encapsulate default headers & setting responses in the context
const defaultHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*', // change to be more strict
  'Content-Type': 'application/json',
};

export const set200Response = <T>(
  log: Logger,
  context: ContextForResponseBody<T>,
  body: T,
) => {
  log(`Returning 200 response`);

  context.res = {
    headers: defaultHeaders,
    statusCode: StatusCodes.OK,
    body,
  };
};

export const set204Response = (
  log: Logger,
  context: ContextForNoContentResponse,
) => {
  log(`Returning 204 response`);

  context.res = {
    headers: defaultHeaders,
    statusCode: StatusCodes.NO_CONTENT,
    body: null,
  };
};

export const set400Response = (log: Logger, context: ErrorContext) => {
  log(`Returning 404 response`);

  context.res = {
    headers: defaultHeaders,
    statusCode: StatusCodes.BAD_REQUEST,
    body: {
      error: 'Bad request',
    },
  };
};

export const set404Response = (log: Logger, context: ErrorContext) => {
  log(`Returning 404 response`);

  context.res = {
    headers: defaultHeaders,
    statusCode: StatusCodes.NOT_FOUND,
    body: {
      error: 'Not found',
    },
  };
};

export const set500Response = (
  log: Logger,
  context: ErrorContext,
  error: Error,
) => {
  log(`Error: ${error.message}`);
  log(`Returning 500 response`);

  context.res = {
    headers: defaultHeaders,
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    body: {
      error: error.message,
    },
  };
};

export const setNotYetImplementedResponse = (
  log: Logger,
  functionName: FunctionName,
  context: ErrorContext,
) => {
  log('Function not implemented');

  context.res = {
    headers: defaultHeaders,
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    body: {
      error: `${functionName} is not implemented`,
    },
  };
};
