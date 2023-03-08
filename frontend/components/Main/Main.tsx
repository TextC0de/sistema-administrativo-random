import { Spinner } from 'flowbite-react'
import useAlert from 'frontend/hooks/useAlert'
import useLoading from 'frontend/hooks/useLoading'
import useUser from 'frontend/hooks/useUser'
import Alert from '../Alert'
import SideMenu from './SideMenu'

export default function Main({children}:{children:JSX.Element | JSX.Element[]}){
    const {isLoggedIn} = useUser()
    const {isLoading} = useLoading()
    const {alerts} = useAlert()

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
            <>
                {alerts.map((alert)=> <Alert {...alert} />)}
            </>
        </main>
    )
}
