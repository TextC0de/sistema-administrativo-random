import { GetServerSidePropsContext } from 'next'
import { IProvince, ICity, CityModel, IImage, ImageModel, ITask } from 'backend/models/interfaces'
import mongoose from 'mongoose'
import dbConnect from 'lib/dbConnect'
import User from 'backend/models/User'

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
    await dbConnect()/* 
    const docBranch = await Branch.findOne({number:297})
    if(!docBranch){
        return { props: {} }
    } */
    const docTasks = await Task.find({}).populate(Task.getPopulateParameters())
    if(!docTasks) return {props:{}}
    docTasks[1] = docTasks[0] 
    docTasks[2] = docTasks[0] 
    docTasks[3] = docTasks[0] 
    const tasks = formatIds(docTasks)
    //console.log(tasks[0]);
    
    return { props: {tasks} }

  }