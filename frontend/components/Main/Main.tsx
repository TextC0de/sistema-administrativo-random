import { Spinner } from 'flowbite-react';
import { useMemo } from 'react';

import SideMenu from './SideMenu';

import useLoading from 'frontend/hooks/useLoading';
import useUser from 'frontend/hooks/useUser';

export default function Main({
    children,
}: {
    children: JSX.Element | JSX.Element[];
}): JSX.Element {
    const { isLoggedIn } = useUser();
    const { isLoading } = useLoading();

    function LoadingWrapper(): JSX.Element {
        return (
            <div className="mx-auto h-full ">
                {isLoading ? (
                    <div className="flex h-full items-center justify-center bg-white">
                        <Spinner />
                    </div>
                ) : (
                    <>{children}</>
                )}
            </div>
        );
    }

    function Main(): JSX.Element {
        return (
            <main className="h-screen select-none pt-16">
                {isLoggedIn && (
                    <div className="h-full">
                        <SideMenu />
                        <div className="h-full pl-52 pt-4">
                            <LoadingWrapper />
                        </div>
                    </div>
                )}
                {!isLoggedIn && <LoadingWrapper />}
            </main>
        );
    }

    return useMemo(Main, [children, isLoggedIn, isLoading]);
}
