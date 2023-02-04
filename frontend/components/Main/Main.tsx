import { useUser } from 'frontend/hooks/useUser'
import SideMenu from './SideMenu'

export default function Main({children}:{children:JSX.Element | JSX.Element[]}){
    const {isLoggedIn} = useUser()
    return (
        <main style={{minHeight:'100vh'}}>
            {isLoggedIn() && 
                <div style={{display:'grid', gridTemplateColumns:'1fr 9fr', minHeight:'inherit'}} className="bg-gray-100">
                    <SideMenu />
                        <div className='w-4/5 mx-auto pt-12'>
                            {children}
                        </div>
                </div>
            }
            {!isLoggedIn() && <>{children}</>}
        </main>
    )
}
