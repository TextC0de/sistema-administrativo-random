import 'frontend/styles/globals.css'
import 'frontend/css/style.css'
import 'frontend/css/form.css'
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
          <Header />
          <Main>
            <Component {...pageProps} />
          </Main>
          <Footer />
      </UserProvider>
    </>
  )
}

export default MyApp

