
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { BsPlus } from 'react-icons/bs'
import ClientTable from 'frontend/components/Tables/ClientTable'
import dbConnect from 'lib/dbConnect'
import { formatIds } from 'lib/utils'
import { IClient } from 'backend/models/interfaces'
import Client from 'backend/models/Client'

interface props{
    clients:IClient[]
}

export default function Clients({clients}:props){

    return(
        <>
            <div className='flex justify-between' >
                <h2 className='text-lg'>Clientes</h2>
                <Link href='/tech-admin/clients/new'>
                    <button className='flex justify-between items-center'>
                        <BsPlus size='30'/>
                        <h4>Agregar un cliente</h4>
                    </button>
                </Link>
            </div>
            <hr className='mb-2'/>
            <ClientTable clients={clients}/>
        </>
    )
}

export async function getServerSideProps(ctx:GetServerSidePropsContext){
    await dbConnect()

    const docClients = await Client.find({})
    const clients = formatIds(docClients)
    return{props:{clients}}

}