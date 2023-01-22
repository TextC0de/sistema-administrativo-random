import { IBranch, IBusiness, ICity, IClient, IProvince } from 'backend/models/interfaces'
import dbConnect from 'lib/dbConnect'
import { GetServerSidePropsContext } from 'next'
import {formatIds} from 'lib/utils'
import City from 'backend/models/City'
import ClientBranchForm, { IClientBranchForm } from 'frontend/components/Forms/TechAdmin/ClientBranchForm'
import Branch from 'backend/models/Branch'
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
    const docCities = await City.find({}).populate(City.populateParameter())
    const docBranch = await Branch.findOne({number:params.number}).populate(Branch.populateParameter())
    const docBusinesses = await Business.find({})
    return {props:{cities:formatIds(docCities), branch:formatIds(docBranch), businesses:formatIds(docBusinesses) }}
}
