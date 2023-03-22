import Client from 'backend/models/Client'
import { IBranch, IBusiness, ICity, IClient, IProvince } from 'backend/models/interfaces'
import ClientBranchesTable from 'frontend/components/Tables/ClientBranchesTable'
import dbConnect from 'lib/dbConnect'
import { deSlugify, formatIds, slugify } from 'lib/utils'
import { GetServerSidePropsContext } from 'next'
import TitleButton from 'frontend/components/TitleButton'
import City from 'backend/models/City'
import Province from 'backend/models/Province'
import Business from 'backend/models/Business'

interface props{
    client:IClient,
    branches:IBranch[]
    cities:ICity[]
    provinces:IProvince[]
    businesses:IBusiness[]
}
export default function ClientView({client, branches, cities, provinces, businesses}:props){
    let name= `Cliente: ${client.name}`
    return(
        <>
            <TitleButton title={name} path={`/tech-admin/clients/${slugify(client.name)}/branches/new`} nameButton='Agregar sucursal'/>
            <ClientBranchesTable branches={branches} cities={cities} provinces={provinces} businesses={businesses}/>
        </>
    )
}

export async function getServerSideProps(ctx:GetServerSidePropsContext){
    const {params} = ctx
    if(!params) return {props:{}}
    await dbConnect()
    const client = await Client.findOne({name:deSlugify(params.name as string)})
    if(!client) return {props:{}}
    const branches = await client.getBranches()
    const cities = await City.findUndeleted()
    const provinces = await Province.findUndeleted()
    const businesses = await Business.findUndeleted()
    const props = formatIds({client, branches, cities, provinces, businesses})
    return {props}
}