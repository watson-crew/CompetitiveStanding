import { Context } from '@azure/functions';
import { FunctionName } from '../types';

export const logForFunction = (
  functionName: FunctionName,
  { log }: Context,
  message: string,
) => {
  log(`[${functionName}] ${message}`);
};

export type Logger = (str: string) => void;

export const getFunctionLogger =
  (funcName: FunctionName, context: Context): Logger =>
  str =>
    context.log(`[${funcName}] ${str}`);
