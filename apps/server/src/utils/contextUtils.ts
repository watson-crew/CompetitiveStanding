import { Context } from '@azure/functions';

// Have some utils to encapsulate default headers & setting responses in the context
const defaultHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET',
  'Content-Type': 'application/json',
};

type ContextResponse = {
  headers: any,
  statusCode: number,
  body?: any
}

const setResponse = (statusCode: number, context: Context, body?: any) => {
  let res: ContextResponse = {
    headers: defaultHeaders,
    statusCode
  }

  if (body) {
    res.body = body;
  }

  context.res = res;
}

export const set404Response = (context: Context) => {
  setResponse(404, context);
};

export const set200Response = (context: Context, body: any) => {
  setResponse(200, context, body)
};

export const set201Response = (context: Context, body: any) => {
  setResponse(201, context, body)
}

export const set204Response = (context: Context) => {
  setResponse(204, context)
}

export const set500Response = (context: Context, error: Error) => {
  setResponse(500, context, error.message)
};
