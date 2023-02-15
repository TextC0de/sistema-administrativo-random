import { GetServerSidePropsContext } from 'next'
import { IProvince, ICity, CityModel, IImage, ImageModel, ITask } from 'backend/models/interfaces'
import mongoose from 'mongoose'
import dbConnect from 'lib/dbConnect'
import UserModel, {User} from 'backend/models/User'
import Preventive from 'backend/models/Preventive'
import Province from 'backend/models/Province'
import City from 'backend/models/City'
import Client from 'backend/models/Client'
import Branch from 'backend/models/Branch'
import Business from 'backend/models/Business'
import Task from 'backend/models/Task'

import { dmyDateString, formatIds } from '../lib/utils'
import TechAdminTaskTable from '../frontend/components/Tables/TaskTable/TechAdminTaskTable'







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



export async function getServerSideProps({req,res}:GetServerSidePropsContext) {
    await dbConnect() 

    //const docUser = await UserModel.findOne()
/*     const b = Business.find()
    const p = Province.find()
    const c = Client.find()
    const docUsers = await UserModel.findOne().populate(User.getPopulateParameters())
 */ 
    const preventive = await Preventive.findOne().populate(Preventive.getPopulateParameters())
    const branch = await Branch.findOne().populate(Branch.getPopulateParameters())
    
    //console.log(preventive?.schema.indexes())
    
    //console.log(docUsers)

   // if(!docUser) return

    
    return { props: {} }

  }