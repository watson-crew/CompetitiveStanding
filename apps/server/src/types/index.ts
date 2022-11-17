import { Context, HttpRequest, HttpResponseFull } from '@azure/functions';

type RequestRouteParams<T = any> = { parameters: { path: T } };

type RouteParamType<T extends RequestRouteParams> = T['parameters']['path'];

export type ParameterizedHttpRequest<T extends RequestRouteParams> = Omit<
  HttpRequest,
  'params'
> & {
  params: RouteParamType<T>;
};

type RequestResponseType<T = any> = {
  responses: { 200: { content: { 'application/json': T } } };
};

type RouteResponseType<T extends RequestResponseType> =
  T['responses'][200]['content']['application/json'];

export type ParameterizedResponseContext<T extends RequestResponseType> = Omit<
  Context,
  'res'
> & {
  res: Partial<HttpResponseFull> & {
    body?: RouteResponseType<T>;
  };
};

// TODO: This can probably be cleaned up so we have a single types that supports all combination of requests

export type PathParameterAzureFunction<
  T extends RequestRouteParams & RequestResponseType,
> = (
  context: ParameterizedResponseContext<T>,
  req: ParameterizedHttpRequest<T>,
  ...args: any[]
) => Promise<any> | void;

export type EmptyParameterAzureFunction<T extends RequestResponseType> = (
  context: ParameterizedResponseContext<T>,
  ...args: any[]
) => Promise<any> | void;
