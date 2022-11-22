import { Context } from '@azure/functions';

// Have some utils to encapsulate default headers & setting responses in the context
const defaultHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET',
  'Content-Type': 'application/json',
};

export const set404Response = (context: Context) => {
  context.res = {
    headers: defaultHeaders,
    statusCode: 404,
  };
};

export const set200Response = (context: Context, body: any) => {
  setResponseWithBody(200, context, body)
};

export const set201Response = (context: Context, body: any) => {
  setResponseWithBody(201, context, body)
}

export const set500Response = (context: Context, error: Error) => {
  setResponseWithBody(500, context, error.message)
};

const setResponseWithBody = (statusCode: number, context: Context, body: any) => {
  context.res = {
    headers: defaultHeaders,
    statusCode,
    body
  }
}
