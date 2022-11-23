import { type ApiClient } from 'schema';
import getConfig from 'next/config';
import React from 'react';

export const ApiContext = React.createContext<ApiClient<unknown> | null>(null);
