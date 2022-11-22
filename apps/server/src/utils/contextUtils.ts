import { StatusCodes } from '../types';
import {
  ContextForResponse as ErrorContext,
  ContextForResponseBody,
} from '../types/responses';
import { Logger } from './logging';

// Have some utils to encapsulate default headers & setting responses in the context
const defaultHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET',
  'Content-Type': 'application/json',
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
