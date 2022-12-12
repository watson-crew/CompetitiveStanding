'use client';

import { ApiContext, getApiInstance } from '@src/context/ApiContext';
import '../../styles/globals.css';
import { Provider as StoreProvider } from 'react-redux';

import { store, persistor } from '@src/store';
import { PersistGate } from 'redux-persist/integration/react';

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
    // <StoreProvider store={store}>
    //   <ApiContext.Provider value={getApiInstance()}>
    //     <PersistGate loading={null} persistor={persistor}>
    //       {children}
    //     </PersistGate>
    //   </ApiContext.Provider>
    // </StoreProvider>
  );
}

export default RootLayout;
