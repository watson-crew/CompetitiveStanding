import { ApiContext, getApiInstance } from '@src/context/ApiContext';
import { AppProps } from 'next/app';
import '../../styles/globals.css';
import { Provider as StoreProvider } from 'react-redux';
import { NavBar } from 'ui';

import { store, persistor } from '@src/store';
import { PersistGate } from 'redux-persist/integration/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider store={store}>
      <ApiContext.Provider value={getApiInstance()}>
        <PersistGate loading={null} persistor={persistor}>
          <NavBar {...pageProps} />
          <Component {...pageProps} />
        </PersistGate>
      </ApiContext.Provider>
    </StoreProvider>
  );
}

export default MyApp;
