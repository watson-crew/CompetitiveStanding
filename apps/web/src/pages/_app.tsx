import { ApiClient } from '@src/../../../packages/schema';
import { store } from '@src/stores'
import { ApiContext } from '@src/context/ApiContext';
import { AppProps } from 'next/app';
import getConfig from 'next/config';
import { Component, useEffect } from 'react';
import "../../styles/globals.css"
import { connect } from 'react-redux';
import { fetchLocations } from '@src/stores/actions/locations'
import { Provider as StoreProvider } from 'react-redux'

function MyApp({ Component, pageProps }: AppProps) {

  const apiInstance = new ApiClient({
    baseURL: getConfig().publicRuntimeConfig.apiBaseUrl,
  });

  // On first app-load, load all locations
  // TODO: Move this into another component
  useEffect(() => {
    fetchLocations();
  }, [])

  return (
    <StoreProvider store={store}>
      <ApiContext.Provider value={apiInstance}>
        <Component {...pageProps} />
      </ApiContext.Provider>
    </StoreProvider>

  )
}

export default MyApp