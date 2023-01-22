import Task from "backend/models/Task"
import Branch from "backend/models/Branch"
import Business from "backend/models/Business"
import Client from "backend/models/Client"
import { IBranch, IBusiness, IClient, IUser } from "backend/models/interfaces"
import User from "backend/models/User"

import dbConnect from "lib/dbConnect"
import { formatIds } from "lib/utils"
import { GetServerSidePropsContext } from "next"
import PreventiveForm, { IPreventiveForm } from "frontend/components/Forms/TechAdmin/PreventiveForm"
import {Month, PreventiveStatus } from "backend/models/types"

interface props{
    branches:IBranch[],
    clients:IClient[],
    businesses:IBusiness[],
    technicians:IUser[]
}

export default function NewTask(props:props){
    const preventiveForm:IPreventiveForm = {
        _id:'',
        branch:{} as IBranch,
        business:{} as IBusiness,
        assigned:[] as IUser[],
        months:[] as Month[],
        status:'Pendiente'
    }

    return(
        <>
            <PreventiveForm preventiveForm={preventiveForm} {...props}/>
        </>
    )
}

export async function getServerSideProps(ctx:GetServerSidePropsContext){
    await dbConnect()
    const docBranches = await Branch.find({}).populate(Branch.populateParameter())
    const docClients = await Client.find({})
    const docBusinesses = await Business.find({})
    const docTechnicians = await User.find({roles:'Tecnico'}).populate(User.populateParameter())
    const branches = formatIds(docBranches)
    const clients = formatIds(docClients)
    const businesses = formatIds(docBusinesses)
    const technicians = formatIds(docTechnicians)
    return {props:{branches, clients, businesses, technicians}}
}