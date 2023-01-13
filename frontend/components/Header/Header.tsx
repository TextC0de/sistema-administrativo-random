import Link from 'next/link'

import {topBar, nav} from './styles'
import logo from 'public/logo_placeholder.png'
import { useRouter } from 'next/router'
import Image from 'next/image'
import * as GS from 'globalStyles'
import * as apiEndpoints from 'lib/apiEndpoints'

import {useUser} from 'frontend/hooks/useUser'
import { useEffect } from 'react'


export default function Header(): JSX.Element{
    const router = useRouter()
    const {user, loginUser, logoutUser, isLoggedIn} = useUser()

    const logout = async() => {
        
        try {
            const res = await fetch(apiEndpoints.logoutUrl)
            console.log(res);
            
        } catch (error) {
            console.log(error)
        }
        logoutUser()
        router.push('/')
    }

    useEffect(()=>{
        console.log('logging user');
        if(!isLoggedIn()) loginUser()
    },[])



    return(
        <div style={topBar}>
            <div style={{display:'flex'}}>
                <Link href='/'>
                    <a>
                        <Image
                            height={'80px'}
                            width={'80px'}
                            src={logo}
                            alt='pet care logo'
                        />  
                    </a>
                </Link>
                {isLoggedIn() && <h2>Hello {`${user.firstName}`}!</h2>}
            </div>
            <div style={nav}>
            {/* {!isLoggedIn() && <Link href='/login'>
                <a style={GS.buttonStyle}>
                    Sign in
                </a>
            </Link>}
            {!isLoggedIn() && <Link href='/login/register'>
                <a style={GS.buttonStyle}>Sign up</a>
            </Link>} */}
            {isLoggedIn() && <div onClick={logout} style={GS.buttonStyle}>
                Sign out
            </div>}
            </div>
        </div>
    )
}

