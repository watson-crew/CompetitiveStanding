import {
  ContextForResponse as ErrorContext,
  ContextForResponseBody,
} from '../types/responses';

// Have some utils to encapsulate default headers & setting responses in the context
const defaultHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET',
  'Content-Type': 'application/json',
};

export const set404Response = (context: ErrorContext) => {
  context.res = {
    headers: defaultHeaders,
    statusCode: 404,
    body: {
      error: 'Not found',
    },
  };
};

export const set200Response = <T>(
  context: ContextForResponseBody<T>,
  body: T,
) => {
  context.res = {
    headers: defaultHeaders,
    statusCode: 200,
    body,
  };
};

export const set500Response = (context: ErrorContext, error: Error) => {
  context.res = {
    headers: defaultHeaders,
    statusCode: 500,
    body: {
      error: error.message,
    },
  };
};
