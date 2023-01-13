import Link from 'next/link'

import { useUser } from 'frontend/hooks/useUser'

export default function SideMenu(){
    const {user} = useUser()

    
    
    return (
        <>
            <div style={{height:'100vh', width:'100%', boxShadow:'0 10px 10px black'}}>
                <ul>
                    <li>
                        <Link href='/'>
                            <a>
                                <h4 style={{padding: '1px'}}>
                                    Homepage
                                </h4>
                            </a>
                        </Link>
                        <Link href='/test'>
                            <a>
                                <h4 style={{padding: '1px'}}>
                                    Testing
                                </h4>
                            </a>
                        </Link>
                        {user?.roles?.includes('Administrativo Tecnico') &&
                            <>
                                <Link href='/tech-admin/services'>
                                    <a>
                                        <h4 style={{padding: '1px'}}>
                                            Servicios
                                        </h4>
                                    </a>
                                </Link>
                                <Link href='/tech-admin/provinces'>
                                    <a>
                                        <h4 style={{padding: '1px'}}>
                                            Provincias
                                        </h4>
                                    </a>
                                </Link>
                            </>
                        }
                    </li>

                </ul>
            </div>
        </>
    )
}