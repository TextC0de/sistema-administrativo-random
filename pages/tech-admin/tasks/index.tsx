import { GetServerSidePropsContext } from 'next'
import { useEffect, useState } from 'react'
import TechAdminTaskTable from 'frontend/components/Tables/TaskTable/TechAdminTaskTable'
import dbConnect from 'lib/dbConnect'
import { formatIds } from 'lib/utils'
import { ITask } from 'backend/models/interfaces'
import Task from 'backend/models/Task'
import Link from 'next/link'
import { BsPlus } from 'react-icons/bs'
import TitleButton from 'frontend/components/TitleButton'

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
    const allTasks = await Task.find({}).populate(Task.populateParameter())
    if(!allTasks) return {props:{}}
    const pendingTasks = allTasks.filter(task => task.status === 'Pendiente')
    const sentTasks = allTasks.filter(task => task.status === 'Enviado')
    const docTasks = pendingTasks.concat(sentTasks)
    //console.log(tasks)
    return {props:{tasks:formatIds(docTasks)}}
}