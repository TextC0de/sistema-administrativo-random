import { useUser } from 'frontend/hooks/useUser'
import SideMenu from './SideMenu'

export default function Main({children}:{children:JSX.Element | JSX.Element[]}){
    const {isLoggedIn} = useUser()
    return (
        <main style={{minHeight:'100vh'}}>
            {isLoggedIn() && 
                <div style={{display:'grid', minHeight:'inherit'}} className="bg-gray-100 select-none">
                    <SideMenu />
                        <div className='w-full mx-auto pl-52'>
                            {children}
                        </div>
                </div>
            }
            {!isLoggedIn() && <>{children}</>}
        </main>
    )
}
