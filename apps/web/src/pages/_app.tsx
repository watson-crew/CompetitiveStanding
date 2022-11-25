import { ApiContext, getApiInstance } from '@src/context/ApiContext';
import { AppProps } from 'next/app';
import "../../styles/globals.css"
import { Provider as StoreProvider } from 'react-redux'
import store from '@src/store'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <StoreProvider store={store}>
      <ApiContext.Provider value={getApiInstance()}>
        <Component {...pageProps} />
      </ApiContext.Provider>
    </StoreProvider>
  )
}

export default MyApp