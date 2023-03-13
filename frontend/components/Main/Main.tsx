import { Spinner } from 'flowbite-react'
import useLoading from 'frontend/hooks/useLoading'
import useUser from 'frontend/hooks/useUser'
import { useMemo } from 'react'
import SideMenu from './SideMenu'

export default function Main({children}:{children:JSX.Element | JSX.Element[]}){
    const {isLoggedIn} = useUser()
    const {isLoading} = useLoading()


    function LoadingWrapper(){
        
        return(
            <div className='h-full mx-auto '>
                {
                    isLoading? 
                    <div className="bg-white h-full flex items-center justify-center"><Spinner/></div>
                    :
                    <>
                        {children}
                    </>
                }
            </div>
        )
    }

    function Main(){

        return (
            <main className='h-screen select-none pt-16'>
                {isLoggedIn && 
                    <div className='h-full'>
                        <SideMenu />
                        <div className='h-full pl-52 pt-4'>
                            <LoadingWrapper />
                        </div>
                    </div>
                }
                {!isLoggedIn && <LoadingWrapper />}
            </main>
        )
    } 

    return useMemo(Main, [children, isLoggedIn, isLoading])
}


