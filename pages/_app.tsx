import 'frontend/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import Header from 'frontend/components/Header';
import Main from 'frontend/components/Main';
import AlertProvider from 'frontend/context/alertContext/AlertProvider';
import LoadingProvider from 'frontend/context/loadingContext/LoadingProvider';
import UserProvider from 'frontend/context/userContext/UserProvider';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <Head>
                <title>Sistema Administrativo Random S.R.L</title>
            </Head>
            <LoadingProvider>
                <AlertProvider>
                    <UserProvider>
                        <div className="flex flex-col">
                            <Header />
                            <Main>
                                <Component {...pageProps} />
                            </Main>
                        </div>
                    </UserProvider>
                </AlertProvider>
            </LoadingProvider>
        </>
    );
}

export default MyApp;
