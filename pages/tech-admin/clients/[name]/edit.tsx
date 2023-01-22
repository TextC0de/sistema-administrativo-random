import { GetServerSidePropsContext } from 'next'
import ClientForm, { IClientForm } from 'frontend/components/Forms/TechAdmin/ClientForm'
import dbConnect from 'lib/dbConnect'
import { formatIds } from 'lib/utils'
import { IClient } from 'backend/models/interfaces'
import Client from 'backend/models/Client'

interface props{
    client:IClient
} 

export default function ClientEdit({client}:props){
    const clientForm:IClientForm = {
        _id:client._id as string,
        name:client.name
    }

    return(
        <>
           <ClientForm newClient={false} clientForm={clientForm}/>
        </>
    )
}

export async function getServerSideProps(ctx:GetServerSidePropsContext){
    const {params} = ctx
    await dbConnect()
    if(!params) return {props:{}}
    const docClient = await Client.findOne({name:params.name})
    const client = formatIds(docClient)
    return {props:{client}}
}
