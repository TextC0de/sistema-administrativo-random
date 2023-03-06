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
                    <div className="fixed h-screen w-screen bg-white flex items-center justify-center">
                        Loading
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
        <main style={{minHeight:'100vh'}}>
            {isLoggedIn() && 
                <div style={{display:'grid', minHeight:'inherit'}} className="bg-gray-100 select-none">
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
