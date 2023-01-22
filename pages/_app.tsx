import 'frontend/styles/globals.css'
import type { AppProps } from 'next/app'

import Head from 'next/head'
import Header from 'frontend/components/Header'
import UserProvider from 'frontend/context/userContext/UserProvider'
import Main from 'frontend/components/Main'
import Footer from 'frontend/components/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
          <title>Sistema Administrativo Random S.R.L</title>
      </Head>
      <UserProvider>
        <div className='flex flex-col'>
          <Header />
          <Main>
            <Component {...pageProps} />
          </Main>
          <Footer/>
        </div>
      </UserProvider>
    </>
  )
}

export default MyApp

