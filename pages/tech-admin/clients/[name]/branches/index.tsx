import Client from 'backend/models/Client'
import { IBranch, IClient } from 'backend/models/interfaces'
import ClientBranchesTable from 'frontend/components/Tables/ClientBranchesTable'
import { deSlugify, formatIds, slugify } from 'lib/utils'
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { BsPlus } from 'react-icons/bs'

interface props{
    client:IClient,
    branches:IBranch[]
}

export default function ClientView({client, branches}:props){

    return(
        <>
            <h1 className='text-lg'>Cliente: {client.name}</h1>
            <div className='flex justify-between' >
                <h2 className='text-lg'>Sucursales</h2>
                <Link href={`/tech-admin/clients/[name]/branches/new`} as={`/tech-admin/clients/${slugify(client.name)}/branches/new`} >
                    <button className='flex justify-between items-center'>
                        <BsPlus size='30'/>
                        <h4>Agregar una Sucursal</h4>
                    </button>
                </Link>
            </div>
            <hr className='mb-2'/>
            <ClientBranchesTable branches={branches}/>
        </>
    )
}

export async function getServerSideProps(ctx:GetServerSidePropsContext){
    const {params} = ctx
    if(!params) return {props:{}}
    const docClient = await Client.findOne({name:deSlugify(params.name as string)})
    if(!docClient) return {props:{}}
    const docBranches = await docClient.getBranches()
    const client = formatIds(docClient)
    const branches = formatIds(docBranches)

    
    return {props:{client, branches}}
}