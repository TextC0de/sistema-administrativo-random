import { Spinner } from 'flowbite-react'
import useLoading from 'frontend/hooks/useLoading'
import useUser from 'frontend/hooks/useUser'
import SideMenu from './SideMenu'

export default function Main({children}:{children:JSX.Element | JSX.Element[]}){
    const {isLoggedIn} = useUser()
    const {isLoading} = useLoading()

    function LoadingWrapper(){
        
        return(
            <>
                {
                    isLoading? 
                    <div className="h-screen bg-white flex items-center justify-center">
                        <div className="text-center">
    <Spinner aria-label="Center-aligned spinner example" />
  </div>
                    </div>
                    :
                    <>
                        {children}
                    </>
                }
            </>
        )
    }

    return (
        <main className='h-screen bg-gray-100 '>
            {isLoggedIn() && 
                <div className="select-none">
                    <SideMenu />
                    <div className='w-full mx-auto pl-52'>
                        <LoadingWrapper />
                    </div>
                </div>
            }
            {!isLoggedIn() && <LoadingWrapper />}
        </main>
    )
}
