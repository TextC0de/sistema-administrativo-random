import Link from 'next/link'

import logo from 'public/logo_placeholder.png'
import { useRouter } from 'next/router'
import Image from 'next/image'
import * as apiEndpoints from 'lib/apiEndpoints'

import {useUser} from 'frontend/hooks/useUser'
import { useEffect } from 'react'
import { Button } from 'flowbite-react'
import fetcher from 'lib/fetcher'


export default function Header(): JSX.Element{
    const router = useRouter()
    const {user, loginUser, logoutUser, isLoggedIn} = useUser()

    const logout = async() => {
        
        try {
            await fetcher.get(apiEndpoints.logoutUrl)
        } catch (error) {
            console.log(error)
            alert('Falló al intentar desloguear al usuario')
        }
        logoutUser()
        router.push('/login')
    }

    useEffect(()=>{
        //console.log('logging user');
        //console.log(isLoggedIn());
        if(!isLoggedIn()) loginUser()
    },[])



    return(
        <header className='header sticky top-0 bg-white shadow-md flex items-center justify-between h-16 px-6 py-02' >
            <div className='flex-shrink-0 flex items-center justify-center select-none'>
                <Link href='/' >
                        <Image     
                            height={'60px'}
                            width={'155px'}                       
                            src={logo}
                            alt='pet care logo'
                        />  
                </Link>
                </div>
                {isLoggedIn() && <h2 className='flex items-center text-black text-lg'>Hola {`${user.firstName}`}!</h2>}
                <div className='flex justify-end select-none'>
                    {
                    isLoggedIn() && 
                        <Button onClick={logout}>
                            Sign out
                        </Button>
                    }
                </div>
        </header>
    )
}

