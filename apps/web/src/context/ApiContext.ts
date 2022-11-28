import { ApiClient } from 'schema';
import getConfig from 'next/config';
import React from 'react';
import { setupCache } from 'axios-cache-adapter';

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
    const cache = setupCache({
      maxAge: 15 * 60 * 1000,
    });

    globalInstance = new ApiClient({
      baseURL: getConfig().publicRuntimeConfig.apiBaseUrl,
      adapter: cache.adapter,
    });
  }

  return globalInstance;
}
