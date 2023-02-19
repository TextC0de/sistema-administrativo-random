import { IBranch, IBusiness, ICity, IClient, IProvince } from 'backend/models/interfaces'
import dbConnect from 'lib/dbConnect'
import { GetServerSidePropsContext } from 'next'
import {formatIds} from 'lib/utils'
import CityModel, {City} from 'backend/models/City'
import ClientBranchForm, { IClientBranchForm } from 'frontend/components/Forms/TechAdmin/ClientBranchForm'
import BranchModel, {Branch} from 'backend/models/Branch'
import Business from 'backend/models/Business'

interface props{
    branch:IBranch
    cities:ICity[]
    businesses:IBusiness[]
}


export default function EditClientBranch({branch, cities, businesses}:props){
    const branchForm:IClientBranchForm = {
        _id:branch._id.toString(),
        number:branch.number,
        client:branch.client,
        city:branch.city,
        businesses:branch.businesses
    }

    return(
        <>
           <ClientBranchForm newBranch={false} branchForm={branchForm} cities={cities} businesses={businesses}/>
        </>
    )
}

export async function getServerSideProps(ctx:GetServerSidePropsContext){
    const{params} = ctx
    if(!params) return{props:{}}
    await dbConnect()
    const docCities = await CityModel.findUndeleted({})
    const docBranch = await BranchModel.findOne({number:params.number}).populate(Branch.getPopulateParameters())
    const docBusinesses = await Business.findUndeleted({})
    //console.log(docBranch)

    return {props:{cities:formatIds(docCities), branch:formatIds(docBranch), businesses:formatIds(docBusinesses) }}
}
