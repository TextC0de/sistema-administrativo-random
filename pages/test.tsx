import { GetServerSidePropsContext } from 'next'
import { IProvince, ICity, IImage, ImageModel, ITask } from 'backend/models/interfaces'
import mongoose from 'mongoose'
import dbConnect from 'lib/dbConnect'
import UserModel, {User} from 'backend/models/User'
import PreventiveModel, {Preventive} from 'backend/models/Preventive'
import ProvinceModel, {Province} from 'backend/models/Province'
import CityModel, {City} from 'backend/models/City'
import ClientModel, {Client} from 'backend/models/Client'
import BranchModel, {Branch} from 'backend/models/Branch'
import BusinessModel, {Business} from 'backend/models/Business'
import TaskModel, {Task} from 'backend/models/Task'

import { dmyDateString, formatIds } from '../lib/utils'
import TechAdminTaskTable from '../frontend/components/Tables/TaskTable/TechAdminTaskTable'
import { DocumentType } from '@typegoose/typegoose'
import ActivityModel, { Activity } from 'backend/models/Activity'







function CityCard ({city}:{city:ICity}){
    return (
        <>
            <div style={{border:'1px grey solid', padding:'1em', margin:'5em', borderRadius:'20px'}}>
                <h3>City: {city.name}</h3>
                <h3>Province: {city.province.name}</h3>
            </div>
        </>
    )
}





export default function Test({tasks}:{tasks:ITask[]}){
    //console.log(tasks);
    
    return(
        <>
            {/* <h1>Testing!</h1> */}
            {/* <TaskCard task={task}/> */}
            {/* tasks.length > 0 && <TechAdminTaskTable tasks={tasks}/> */}
        </>
    )
}

async function setSchemas(){

    const b = await BusinessModel.find()
    const p = await ProvinceModel.find()
    const c = await ClientModel.find()
    const docUsers = await UserModel.findOne().populate(User.getPopulateParameters())
 
}

export async function getServerSideProps({req,res}:GetServerSidePropsContext) {
    //await dbConnect() 
    
    //const docUser = await UserModel.findOne()
    await setSchemas()
    /* const users = await UserModel.find({})
    users.forEach((user:DocumentType<User>)=>user.save())
    const branches = await BranchModel.find({})
    branches.forEach((branch:DocumentType<Branch>)=> branch.save())
    const clients = await ClientModel.find({})
    clients.forEach((client:DocumentType<Client>)=>client.save())
    const businesses = await BusinessModel.find({})
    businesses.forEach((business:DocumentType<Business>)=>business.save())
    const provinces = await ProvinceModel.find({})
    provinces.forEach((province:DocumentType<Province>)=>province.save())
    const tasks = await TaskModel.find({})
    tasks.forEach((task:DocumentType<Task>)=>task.save())
    const preventives = await PreventiveModel.find({})
    preventives.forEach((preventive:DocumentType<Preventive>)=>preventive.save())
    
 */
    //console.log(preventive?.schema.indexes())
    
    //console.log(docUsers)

   // if(!docUser) return

    
    return { props: {} }

  }