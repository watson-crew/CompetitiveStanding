'use client';

import { ApiContext } from '@src/context/ApiContext';
import { Provider as StoreProvider } from 'react-redux';

import { store, persistor } from '@src/store';
import { PersistGate } from 'redux-persist/integration/react';
import { getApiInstance } from '@src/factory/apiFactory';

function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider store={store}>
      <ApiContext.Provider value={getApiInstance()}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </ApiContext.Provider>
    </StoreProvider>
  );
}

export default RootProvider;
