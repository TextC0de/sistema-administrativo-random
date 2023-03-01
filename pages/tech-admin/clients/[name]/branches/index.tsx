import Client from 'backend/models/Client'
import { IBranch, IClient } from 'backend/models/interfaces'
import ClientBranchesTable from 'frontend/components/Tables/ClientBranchesTable'
import dbConnect from 'lib/dbConnect'
import { deSlugify, formatIds, slugify } from 'lib/utils'
import { GetServerSidePropsContext } from 'next'
import TitleButton from 'frontend/components/TitleButton'

interface props{
    client:IClient,
    branches:IBranch[]
}
export default function ClientView({client, branches}:props){
    let name= `Cliente: ${client.name}`
    return(
        <>
            <TitleButton title={name} path='/tech-admin/clients/[name]/branches/new' nameButton='Agregar sucursal'/>
            <ClientBranchesTable branches={branches}/>
        </>
    )
}

export async function getServerSideProps(ctx:GetServerSidePropsContext){
    const {params} = ctx
    if(!params) return {props:{}}
    await dbConnect()
    const docClient = await Client.findOne({name:deSlugify(params.name as string)})
    if(!docClient) return {props:{}}
    const docBranches = await docClient.getBranches()
    const client = formatIds(docClient)
    const branches = formatIds(docBranches)
    return {props:{client, branches}}
}