import { HttpRequest } from '@azure/functions';

type Stringified<T> = {
  [P in keyof T]: string;
};

export type ParameterizedHttpRequest<PathParams, BodyParams, QueryParams> =
  Omit<HttpRequest, 'params' | 'body' | 'query'> & {
    query: Stringified<QueryParams>;
    body: BodyParams;
    params: Stringified<PathParams>;
  };

export type HttpRequestForRequestBody<BodyType> = ParameterizedHttpRequest<
  never,
  BodyType,
  never
>;

export type HttpRequestForQueryParams<QueryParams> = ParameterizedHttpRequest<
  never,
  never,
  QueryParams
>;

export type HttpRequestForRequestParams<RouteParams> = ParameterizedHttpRequest<
  RouteParams,
  never,
  never
>;
