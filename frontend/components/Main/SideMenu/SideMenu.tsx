import Link from 'next/link'

import { useUser } from 'frontend/hooks/useUser'
import { Sidebar } from 'flowbite-react'

export default function SideMenu(){
    const {user} = useUser()
    return (
        <>
            <div className='w-full shadow-md shadow-teal-500 rounded-none bg-teal-400'>
                <Sidebar className='h-full' /* style={{height:'100vh', width:'100%', boxShadow:'0 10px 5px #999', borderRadius:'0'}} */>
                    <Sidebar.Items >
                        <Sidebar.ItemGroup >
                            <Sidebar.Item >
                                <Link href='/'>
                                    <a>
                                        <h4 style={{padding: '1px'}}>
                                            Homepage
                                        </h4>
                                    </a>
                                </Link>
                            </Sidebar.Item>
                            <Sidebar.Item>
                                <Link href='/test'>
                                    <a>
                                        <h4 style={{padding: '1px'}}>
                                            Testing
                                        </h4>
                                    </a>
                                </Link>
                            </Sidebar.Item>
                        </Sidebar.ItemGroup> 
                        {user?.roles?.includes('Administrativo Tecnico') &&
                            <Sidebar.ItemGroup>
                                <Sidebar.Item>
                                    <Link href='/tech-admin/tasks'>
                                        <a>
                                            <h4 style={{padding: '1px'}}>
                                                Tareas
                                            </h4>
                                        </a>
                                    </Link>
                                </Sidebar.Item>
                                <Sidebar.Item>
                                    <Link href='/tech-admin/preventives'>
                                        <a>
                                            <h4 style={{padding: '1px'}}>
                                                Preventivos
                                            </h4>
                                        </a>
                                    </Link>
                                </Sidebar.Item>
                                <Sidebar.Item>
                                    <Link href='/tech-admin/clients'>
                                        <a>
                                            <h4 style={{padding: '1px'}}>
                                                Clientes
                                            </h4>
                                        </a>
                                    </Link>
                                </Sidebar.Item>
                                <Sidebar.Item>
                                    <Link href='/tech-admin/businesses'>
                                        <a>
                                            <h4 style={{padding: '1px'}}>
                                                Empresas
                                            </h4>
                                        </a>
                                    </Link>
                                </Sidebar.Item>
                                <Sidebar.Item>
                                    <Link href='/tech-admin/provinces'>
                                        <a>
                                            <h4 style={{padding: '1px'}}>
                                                Provincias
                                            </h4>
                                        </a>
                                    </Link>
                                </Sidebar.Item>
                                <Sidebar.Item>
                                    <Link href='/tech-admin/cities'>
                                        <a>
                                            <h4 style={{padding: '1px'}}>
                                                Localidades
                                            </h4>
                                        </a>
                                    </Link>
                                </Sidebar.Item>
                                <Sidebar.Item>
                                    <Link href='/tech-admin/users'>
                                        <a>
                                            <h4 style={{padding: '1px'}}>
                                                Usuarios
                                            </h4>
                                        </a>
                                    </Link>
                                </Sidebar.Item>
                            </Sidebar.ItemGroup>
                        }
                    </Sidebar.Items>
                </Sidebar>
            </div>
        </>
    )
}