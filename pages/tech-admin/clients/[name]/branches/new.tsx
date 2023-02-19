import { IBusiness, ICity, IClient, IProvince } from 'backend/models/interfaces'
import dbConnect from 'lib/dbConnect'
import { GetServerSidePropsContext } from 'next'
import {deSlugify, formatIds} from 'lib/utils'
import CityModel, {City} from 'backend/models/City'
import Client from 'backend/models/Client'
import ClientBranchForm, { IClientBranchForm } from 'frontend/components/Forms/TechAdmin/ClientBranchForm'
import Business from 'backend/models/Business'

interface props{
    cities:ICity[]
    client:IClient
    businesses:IBusiness[]
}


export default function NewClientBranch({cities, client, businesses}:props){
    const branchForm:IClientBranchForm = {
        _id:'',
        number:0,
        client,
        city:{} as ICity,
        businesses:[]
    }

    return(
        <>
           <ClientBranchForm branchForm={branchForm} cities={cities} businesses={businesses}/>
        </>
    )
}

export async function getServerSideProps(ctx:GetServerSidePropsContext){
    const{params} = ctx
    if(!params) return{props:{}}
    await dbConnect()
    const cities = await CityModel.findUndeleted({})
    const client = await Client.findOne({name:deSlugify(params.name as string)})
    const businesses = await Business.findUndeleted({})
    //console.log(client)

    
    return {props:formatIds({cities, client, businesses})}
}
