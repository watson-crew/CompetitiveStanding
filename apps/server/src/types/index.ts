import { Context, HttpRequest, HttpResponseFull } from '@azure/functions';

type RequestRouteParams<T = any> = { parameters: { path: T } };

type RouteParamType<T extends RequestRouteParams> = T['parameters']['path'];

export type ParameterizedHttpRequest<T extends RequestRouteParams> = Omit<
  HttpRequest,
  'params'
> & {
  params: RouteParamType<T>;
};

type RequestBodyParams<T = any> = {
  requestBody: { content: { 'application/json': T } };
};

type BodyParamType<T extends RequestBodyParams> =
  T['requestBody']['content']['application/json'];

export type HttpRequestWithBody<T extends RequestBodyParams> = Omit<
  HttpRequest,
  'body'
> & {
  body: BodyParamType<T>;
};

// 200s
type HttpOkResponseType<T = any> = {
  responses: { 200: { content: { 'application/json': T } } };
};

type RouteResponseType<T extends HttpOkResponseType> =
  T['responses'][200]['content']['application/json'];

export type ParameterizedResponseContext<T extends HttpOkResponseType> = Omit<
  Context,
  'res'
> & {
  res: Partial<HttpResponseFull> & {
    body?: RouteResponseType<T>;
  };
};

// 201s
type PostResponseType<T extends HttpCreatedResponseType> =
  T['responses'][201]['content']['application/json'];

type HttpCreatedResponseType<T = any> = {
  responses: { 201: { content: { 'application/json': T } } };
};

export type ParameterizedPostResponseContext<
  T extends HttpCreatedResponseType,
> =
  | (Omit<Context, 'res'> & {
      statusCode: 200;
      res: Partial<HttpResponseFull> & {
        body: PostResponseType<T>;
      };
    })
  | ErrorResponse;

type ErrorResponse = Omit<Context, 'res'> & {
  statusCode: number;
  res: Partial<HttpResponseFull> & {
    body: {
      message: string;
    };
  };
};

// TODO: This can probably be cleaned up so we have a single types that supports all combination of requests

export type PathParameterAzureFunction<
  T extends RequestRouteParams & HttpOkResponseType,
> = (
  context: ParameterizedResponseContext<T>,
  req: ParameterizedHttpRequest<T>,
  ...args: any[]
) => Promise<any> | void;

export type EmptyParameterAzureFunction<T extends HttpOkResponseType> = (
  context: ParameterizedResponseContext<T>,
  ...args: any[]
) => Promise<any> | void;

export type PostRequestAzureFunction<
  T extends RequestBodyParams & HttpCreatedResponseType,
> = (
  context: ParameterizedPostResponseContext<T>,
  req: HttpRequestWithBody<T>,
  ...args: any[]
) => Promise<any> | void;
