import { ApiClient } from 'schema';
import getConfig from 'next/config';
import React from 'react';

let globalInstance: ApiClient<unknown>;

export const ApiContext = React.createContext<ApiClient<unknown>>(
  getApiInstance(),
);

/**
 * Only to be used in places where useContext is not allowed.
 * @returns
 */
export function getApiInstance(): ApiClient<unknown> {
  if (!globalInstance) {
    globalInstance = new ApiClient({
      baseURL: getConfig().publicRuntimeConfig.apiBaseUrl,
    });
  }

  return globalInstance;
}
