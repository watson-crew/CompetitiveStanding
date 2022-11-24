// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getConfig from 'next/config';

// TODO: Check if we use this redux generated API does it remove the need for the axios ApiClient that is generated?
// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: getConfig().publicRuntimeConfig.apiBaseUrl }),
  endpoints: () => ({}),
})