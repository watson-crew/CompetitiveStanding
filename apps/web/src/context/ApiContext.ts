import { ApiClient } from 'schema';
import React from 'react';
// import {
//   setupCache,
//   buildMemoryStorage,
//   defaultKeyGenerator,
//   defaultHeaderInterpreter
// } from 'axios-cache-interceptor/dev';

import { setup, setupCache } from 'axios-cache-adapter'

// Using axios-cache-adapter which requires axios v0.21.0 which is out-of-date
// const cache = setupCache({
//   maxAge: 15 * 60 * 1000,
//   exclude: { query: false }
// });

// const apiClient = new ApiClient({
//   adapter: cache.adapter
// });

const apiClient = new ApiClient()
apiClient.instance = setup({
  cache: {
    maxAge: 15 * 60 * 1000,
    exclude: { query: false }
  }
})
// Using axios-cache-interceptor which is more up-to-date
// apiClient.instance = setupCache(
//   apiClient.instance,

//   // All options with their default values
//   {
//     // The storage to save the cache data. There are more available by default.
//     //
//     // https://axios-cache-interceptor.js.org/#/pages/storages
//     storage: buildMemoryStorage(),

//     // The mechanism to generate a unique key for each request.
//     //
//     // https://axios-cache-interceptor.js.org/#/pages/request-id
//     generateKey: defaultKeyGenerator,

//     // The mechanism to interpret headers (when cache.interpretHeader is true).
//     //
//     // https://axios-cache-interceptor.js.org/#/pages/global-configuration?id=headerinterpreter
//     headerInterpreter: defaultHeaderInterpreter,

//     // The function that will receive debug information.
//     // NOTE: For this to work, you need to enable development mode.
//     //
//     // https://axios-cache-interceptor.js.org/#/pages/development-mode
//     // https://axios-cache-interceptor.js.org/#/pages/global-configuration?id=debug
//     debug: console.log,

//     ttl: 10 * 1000 // Default ttl of 10 seconds
//   }
// );

export const ApiContext = React.createContext<ApiClient<unknown>>(
  apiClient
);
