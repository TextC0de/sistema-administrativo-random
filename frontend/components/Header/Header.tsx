import logo from 'public/logo_placeholder.png'
import { useRouter } from 'next/router'
import Image from 'next/image'
import * as apiEndpoints from 'lib/apiEndpoints'
import useUser from 'frontend/hooks/useUser'
import { useEffect } from 'react'
import { Button } from 'flowbite-react'
import fetcher from 'lib/fetcher'
import useLoading from 'frontend/hooks/useLoading'
import {GrLogout } from 'react-icons/gr'
export default function Header(): JSX.Element{
    const router = useRouter()
    const {user, loginUser, logoutUser, isLoggedIn} = useUser()
    const {startLoading, stopLoading} = useLoading()
    const logout = async() => {
        try {
            startLoading()
            await fetcher.get(apiEndpoints.logoutUrl)
            
        } catch (error) {
            console.log(error)
            stopLoading()
            alert('Falló al intentar desloguear al usuario')
        }
        logoutUser()
        await router.push('/login')
        stopLoading()
    }

    useEffect(()=>{
        if(!isLoggedIn()) loginUser()
    },[])

    function navigate(){
        startLoading()
        router.push('/')
        stopLoading()
    }

    return(
        <header className='fixed bg-white w-full shadow-md flex items-center justify-between px-6 z-50' >
            <div className='flex-shrink-0 flex items-center justify-center'>
                <button onClick={navigate} >
                        <Image     
                            height={'60px'}
                            width={'155px'}                       
                            src={logo}
                            alt='pet care logo'
                        />  
                </button>
                </div>
                {isLoggedIn() && <h2 className='flex items-center text-lg'>Hola {user.firstName}!</h2>}
                <div className='flex justify-end'>
                    {
                    isLoggedIn() && 
                        <button className="flex p-2 pl-3 justify-content hover:bg-gray-200 border border-gray-200 rounded-lg select-none" onClick={logout}>
                            <div className='flex flex-row justify-between items-center'>
                                <GrLogout size={18}/>
                            </div>
                        </button>
                    }
                </div>
        </header>
    )
}

