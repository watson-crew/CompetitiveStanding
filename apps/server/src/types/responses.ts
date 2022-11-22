import { Context, HttpResponseFull } from '@azure/functions';
import { StatusCodes } from 'http-status-codes';

type SuccessStatusCodes =
  | StatusCodes.OK
  | StatusCodes.CREATED
  | StatusCodes.NO_CONTENT;

type HttpResponse<BodyType, Code = StatusCodes.OK> = Omit<
  Partial<HttpResponseFull>,
  'body' | 'statusCode'
> & {
  statusCode: Code;
  body: BodyType;
};

type ErrorBody = {
  error: string;
  detail?: string;
};

type HttpErrorResponse = HttpResponse<
  ErrorBody,
  Exclude<StatusCodes, SuccessStatusCodes>
>;

type HttpSuccessResponse<BodyType> = HttpResponse<BodyType, SuccessStatusCodes>;

type HttpNoContentResponse = HttpResponse<null, StatusCodes.NO_CONTENT>;

export type ContextForResponse<T = any> = Omit<Context, 'res'> & {
  res: T | HttpErrorResponse;
};

export type ContextForResponseBody<BodyType> = ContextForResponse<
  HttpSuccessResponse<BodyType>
>;

export type ContextForNoContentResponse =
  ContextForResponse<HttpNoContentResponse>;
