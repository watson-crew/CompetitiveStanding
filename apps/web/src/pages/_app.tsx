import { ApiClient } from '@src/../../../packages/schema';
import { store } from '@src/stores'
import { ApiContext } from '@src/context/ApiContext';
import { StoreContext } from '@src/context/StoreContext';
import { AppProps } from 'next/app';
import getConfig from 'next/config';
import { Component } from 'react';
import "../../styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {

  const apiInstance = new ApiClient({
    baseURL: getConfig().publicRuntimeConfig.apiBaseUrl,
  });

  return (
    <StoreContext.Provider value={store}>
      <ApiContext.Provider value={apiInstance}>
        <Component {...pageProps} />
      </ApiContext.Provider>
    </StoreContext.Provider>

  )
}

export default MyApp