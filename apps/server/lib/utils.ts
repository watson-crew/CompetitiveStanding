import { Context } from '@azure/functions';

// Have some utils to encapsulate default headers & setting responses in the context
const defaultHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Content-Type': 'application/json',
};

export const return404 = (context: Context) => {
    context.res = {
        headers: defaultHeaders,
        statusCode: 404,
    };
};

export const return200 = (context: Context, body: any) => {
    context.res = {
        headers: defaultHeaders,
        statusCode: 200,
        body,
    };
};

export const return500 = (context: Context, error: Error) => {
    context.res = {
        headers: defaultHeaders,
        statusCode: 500,
        body: error.message,
    };
};