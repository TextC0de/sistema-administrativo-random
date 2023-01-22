import Link from 'next/link'

import {topBar, nav} from './styles'
import logo from 'public/logo_placeholder.png'
import { useRouter } from 'next/router'
import Image from 'next/image'
import * as GS from 'globalStyles'
import * as apiEndpoints from 'lib/apiEndpoints'

import {useUser} from 'frontend/hooks/useUser'
import { useEffect } from 'react'
import { Button } from 'flowbite-react'


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
        //console.log('logging user');
        //console.log(isLoggedIn());
        if(!isLoggedIn()) loginUser()
    },[])



    return(
        <header className='flex w-full justify-between items-center shadow-md shadow-teal-500 bg-teal-400' style={{height:'10vh'}} /* style={topBar} */>
            <div className='flex'>
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
                {isLoggedIn() && <h2 className='self-center text-lg'>Hola {`${user.firstName}`}!</h2>}
            </div>
            <div className='flex items-center' /* style={nav} */>
                {
                isLoggedIn() && 
                    <Button onClick={logout} className='mr-2'>
                        Sign out
                    </Button>
                }
            </div>
        </header>
    )
}

