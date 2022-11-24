import { store } from '@src/stores';
import { Store } from 'redux'
import React from 'react';

export const StoreContext = React.createContext<Store>(
  store,
);
