import { ApiClient } from 'schema';
import React from 'react';

export const ApiContext = React.createContext<ApiClient<unknown>>(
  new ApiClient(),
);
