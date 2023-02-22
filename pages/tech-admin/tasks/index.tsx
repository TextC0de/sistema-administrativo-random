import { GetServerSidePropsContext } from 'next'
import TechAdminTaskTable from 'frontend/components/Tables/TaskTable/TechAdminTaskTable'
import dbConnect from 'lib/dbConnect'
import { formatIds } from 'lib/utils'
import { ITask } from 'backend/models/interfaces'
import Task from 'backend/models/Task'
import TitleButton from 'frontend/components/TitleButton'
import {Business} from 'backend/models/Business'
import {User} from 'backend/models/User'
import {Client} from 'backend/models/Client'
import {Province} from 'backend/models/Province'
import { getModelForClass } from '@typegoose/typegoose'

interface ITaskProps{
    tasks:ITask[]
}

export default function TechAdminTasks({tasks}:ITaskProps){



    return(
        <>
            <TitleButton title='Tareas pendientes' path='/tech-admin/tasks/new' nameButton='Delegar tarea'/>
            <TechAdminTaskTable tasks={tasks}/>
        </>
    )
}

export async function getServerSideProps({req, res}:GetServerSidePropsContext){
    await dbConnect()
    getModelForClass(Business)
    getModelForClass(User)
    getModelForClass(Client)
    getModelForClass(Province)
    const allTasks = await Task.findUndeleted({})
    if(!allTasks) return {props:{}}
    const pendingTasks = allTasks.filter(task => task.status === 'Pendiente')
    const sentTasks = allTasks.filter(task => task.status === 'Enviado')
    const docTasks = pendingTasks.concat(sentTasks)
    //console.log(tasks)
    return {props:{tasks:formatIds(docTasks)}}
}