import { ApiClient } from '@src/../../../packages/schema';
import { ApiContext } from '@src/context/ApiContext';
import { AppProps } from 'next/app';
import getConfig from 'next/config';
import { Component } from 'react';
import "../../styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {

  const apiInstance = new ApiClient({
    baseURL: getConfig().publicRuntimeConfig.apiBaseUrl,
  });

  return (
    <ApiContext.Provider value={apiInstance}>
      <Component {...pageProps} />
    </ApiContext.Provider>
  )
}

export default MyApp