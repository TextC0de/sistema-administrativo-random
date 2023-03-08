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

    return (
        <main className='h-screen select-none pt-16'>
            {isLoggedIn() && 
                <div className='h-full'>
                    <SideMenu />
                    <div className='h-full pl-52'>
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
