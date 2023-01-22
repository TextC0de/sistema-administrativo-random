import { useUser } from 'frontend/hooks/useUser'
import SideMenu from './SideMenu'

export default function Main({children}:{children:JSX.Element | JSX.Element[]}){
    const {isLoggedIn} = useUser()
    return (
        <main style={{minHeight:'80vh'}}>
            {isLoggedIn() && 
                <div style={{display:'grid', gridTemplateColumns:'1fr 5fr', minHeight:'inherit'}}>
                    <SideMenu />
                    <>
                        <div style={{height:'95%', width:'95%', margin:'auto',padding:'1em',}}>
                            {children}
                        </div>
                    </>
                </div>
            }
            {!isLoggedIn() && <>{children}</>}
        </main>
    )
}