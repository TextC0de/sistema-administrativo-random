import '../styles/globals.css'
import '../css/style.css'
import '../css/form.css'
import type { AppProps } from 'next/app'

import Head from 'next/head'
import Header from '../components/Header/Header'
import UserProvider from '../context/userContext/UserProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
          <title>Sistema Administrativo Random S.R.L</title>
      </Head>
      <UserProvider>
        <Header />
        <Component {...pageProps} />

      </UserProvider>
    </>
  )
}

export default MyApp

