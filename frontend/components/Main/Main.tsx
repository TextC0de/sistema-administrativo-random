import { useUser } from 'frontend/hooks/useUser'
import SideMenu from './SideMenu'

export default function Main({children}:{children:JSX.Element | JSX.Element[]}){
    const {isLoggedIn} = useUser()
    return (
        <>
            {isLoggedIn() && 
                <div style={{display:'grid', gridTemplateColumns:'1fr 5fr'}}>
                    <SideMenu />
                    <>
                    <div style={{height:'95%', width:'95%', margin:'auto',padding:'1em', /* boxShadow:'0 0 10px #999', borderRadius:'20px' */}}>
                        {children}
                    </div>
                    </>
                </div>
            }
            {!isLoggedIn() && <>{children}</>}
        </>
    )
}