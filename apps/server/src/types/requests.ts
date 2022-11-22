import { HttpRequest } from '@azure/functions';

type ParameterizedHttpRequest<PathParams, BodyParams, QueryParams> = Omit<
  HttpRequest,
  'params' | 'body' | 'query'
> & {
  query: QueryParams;
  body: BodyParams;
  params: PathParams;
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
