import { ApiContext, getApiInstance } from '@src/context/ApiContext';
import { AppProps } from 'next/app';
import "../../styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ApiContext.Provider value={getApiInstance()}>
      <Component {...pageProps} />
    </ApiContext.Provider>
  )
}

export default MyApp