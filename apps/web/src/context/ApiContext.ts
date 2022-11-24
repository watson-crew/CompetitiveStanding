import { ApiClient } from 'schema';
import React from 'react';
import getConfig from 'next/config';

export const ApiContext = React.createContext<ApiClient<unknown>>(
  new ApiClient(),
);

export function getApiInstance() {
  return new ApiClient({
    baseURL: getConfig().publicRuntimeConfig.apiBaseUrl,
  });
} ;