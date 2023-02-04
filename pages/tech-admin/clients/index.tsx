
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { BsPlus } from 'react-icons/bs'
import ClientTable from 'frontend/components/Tables/ClientTable'
import dbConnect from 'lib/dbConnect'
import { formatIds } from 'lib/utils'
import { IClient } from 'backend/models/interfaces'
import Client from 'backend/models/Client'
import TitleButton from 'frontend/components/TitleButton'

interface props{
    clients:IClient[]
}

export default function Clients({clients}:props){

    return(
        <>
            <TitleButton title='Clientes' path='/tech-admin/clients/new' nameButton='Agregar cliente'/>
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