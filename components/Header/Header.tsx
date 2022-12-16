import Link from 'next/link'

import {topBar, nav} from './styles'
import petLogo from '../../public/Pet_logo_with_flowers.png'
import { useRouter } from 'next/router'
import Image from 'next/image'
import * as GS from '../../globalStyles'


import {useUser} from '../../hooks/useUser'
import { useEffect } from 'react'


export default function Header(): JSX.Element{
    const router = useRouter()
    const {user, loginUser, logoutUser, getBaseUrl, isLoggedIn} = useUser()

    const logout = async() => {
        
        try {
            const baseUrl = await getBaseUrl()
            await fetch(`${baseUrl}api/auth/logout`)
        } catch (error) {
            console.log(error)
        }
        logoutUser()
        router.push('/')
    }

    useEffect(()=>{
        loginUser()
    },[])



    return(
        <div style={topBar}>
            <div style={{display:'flex'}}>
                <Link href="/">
                    <a>
                        <Image
                            height={'80px'}
                            width={'80px'}
                            src={petLogo}
                            alt="pet care logo"
                        />  
                    </a>
                </Link>
                {isLoggedIn() && <h2>Hello {`${user.firstName}`}!</h2>}
            </div>
            <div style={nav}>
            {isLoggedIn() &&<Link href="/my-pets">
                <a style={GS.buttonStyle}>My Pets</a>
            </Link>}
            {!isLoggedIn() && <Link href="/login">
                <a style={GS.buttonStyle}>
                    Sign in
                </a>
            </Link>}
            {!isLoggedIn() && <Link href="/login/register">
                <a style={GS.buttonStyle}>Sign up</a>
            </Link>}
            {isLoggedIn() && <div onClick={logout} style={GS.buttonStyle}>
                Sign out
            </div>}
            </div>
        </div>
    )
}

