import '../styles/globals.css';

import { Inter as FontSans } from 'next/font/google';

import Header from '@/components/Header';
import Main from '@/components/Main';
import AlertProvider from '@/context/alertContext/AlertProvider';
import LoadingProvider from '@/context/loadingContext/LoadingProvider';
import UserProvider from '@/context/userContext/UserProvider';

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
});

export const metadata = {
    title: 'Sistema Administrativo Random S.R.L',
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="es">
            <body className={`${fontSans.variable} font-sans`}>
                <LoadingProvider>
                    <AlertProvider>
                        <UserProvider>
                            <div className="flex flex-col">
                                <Header />
                                <Main>{children}</Main>
                            </div>
                        </UserProvider>
                    </AlertProvider>
                </LoadingProvider>
            </body>
        </html>
    );
};

export default RootLayout;
