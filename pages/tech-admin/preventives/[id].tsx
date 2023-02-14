import Task from "backend/models/Task"
import Branch from "backend/models/Branch"
import Business from "backend/models/Business"
import Client from "backend/models/Client"
import { IBranch, IBusiness, IClient, IUser, IPreventive } from "backend/models/interfaces"
import User from "backend/models/User"

import dbConnect from "lib/dbConnect"
import { formatIds } from "lib/utils"
import { GetServerSidePropsContext } from "next"
import PreventiveForm, { IPreventiveForm } from "frontend/components/Forms/TechAdmin/PreventiveForm"
import {Frequency, Month} from "backend/models/types"
import Preventive from "backend/models/Preventive"

interface props{
    preventive:IPreventive,
    branches:IBranch[],
    clients:IClient[],
    businesses:IBusiness[],
    technicians:IUser[]
}

export default function NewTask({branches, clients, businesses, technicians, preventive}:props){
    const preventiveFormProps = {branches, clients, businesses, technicians}
    
    const preventiveForm:IPreventiveForm = {
        _id:preventive._id as string,
        branch:preventive.branch,
        business:preventive.business,
        assigned:preventive.assigned,
        months:preventive.months as Month[],
        frequency:preventive.frequency as Frequency,
        status:preventive.status,
        lastDoneAt:preventive.lastDoneAt,
        batteryChangedAt:preventive.batteryChangedAt,
        observations:preventive.observations,
    }

    return(
        <>
            <PreventiveForm newPreventive={false} preventiveForm={preventiveForm} {...preventiveFormProps} />
        </>
    )
}

export async function getServerSideProps(ctx:GetServerSidePropsContext){
    const {params} = ctx
    if(!params) return {props:{}} 
    await dbConnect()
    const docPreventive = await Preventive.findById(params.id).populate(Preventive.getPopulateParameters())
    if(!docPreventive) return {props:{}} 
    console.log(docPreventive);
    
    const docBranches = await Branch.find({}).populate(Branch.getPopulateParameters())
    const docClients = await Client.find({})
    const docBusinesses = await Business.find({})
    const docTechnicians = await User.find({roles:'Tecnico'}).populate(User.getPopulateParameters())
    const branches = formatIds(docBranches)
    const clients = formatIds(docClients)
    const businesses = formatIds(docBusinesses)
    const technicians = formatIds(docTechnicians)
    const preventive = formatIds(docPreventive)
    console.log(preventive);
    
    return {props:{branches, clients, businesses, technicians, preventive}}
}