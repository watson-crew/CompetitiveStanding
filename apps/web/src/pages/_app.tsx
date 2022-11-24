import { ApiClient } from '@src/../../../packages/schema';
import { ApiContext, getApiInstance } from '@src/context/ApiContext';
import { AppProps } from 'next/app';
import getConfig from 'next/config';
import { Component } from 'react';
import "../../styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ApiContext.Provider value={getApiInstance()}>
      <Component {...pageProps} />
    </ApiContext.Provider>
  )
}

export default MyApp