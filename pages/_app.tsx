import 'frontend/styles/globals.css'
import type { AppProps } from 'next/app'
import LoadingProvider from 'frontend/context/loadingContext/LoadingProvider'
import Head from 'next/head'
import Header from 'frontend/components/Header'
import UserProvider from 'frontend/context/userContext/UserProvider'
import Main from 'frontend/components/Main'

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <>
      <Head>
          <title>Sistema Administrativo Random S.R.L</title>
      </Head>
      <LoadingProvider>
        <UserProvider>
          <div className='flex flex-col'>
            <Header />
            <Main>
              <Component {...pageProps} />
            </Main>
          </div>
        </UserProvider>
      </LoadingProvider>
    </>
  )
}

export default MyApp

