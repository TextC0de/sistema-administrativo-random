import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter as FontSans } from 'next/font/google';
import Head from 'next/head';

import { QueryClient, QueryClientProvider } from 'react-query';

import Main from '@/components/Main';
import AlertProvider from '@/context/alertContext/AlertProvider';
import LoadingProvider from '@/context/loadingContext/LoadingProvider';
import UserProvider from '@/context/userContext/UserProvider';

const queryClient = new QueryClient();

export const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
});

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <style jsx global>
                {`
                    :root {
                        --font-sans: 'Inter', sans-serif;
                    }
                `}
            </style>

            <Head>
                <title>Sistema Administrativo Random S.R.L</title>
            </Head>

            <div className={fontSans.className}>
                <QueryClientProvider client={queryClient}>
                    <LoadingProvider>
                        <AlertProvider>
                            <UserProvider>
                                <Main>
                                    <Component {...pageProps} />
                                </Main>
                            </UserProvider>
                        </AlertProvider>
                    </LoadingProvider>
                </QueryClientProvider>
            </div>
        </>
    );
}

export default MyApp;