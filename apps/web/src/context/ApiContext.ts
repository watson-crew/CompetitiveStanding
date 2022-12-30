'use client';

import { ApiClient } from 'schema';
import React from 'react';
import { getApiInstance } from '@src/factory/apiFactory';

export const ApiContext = React.createContext<ApiClient<unknown>>(
  getApiInstance(),
);
