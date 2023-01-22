import { GetServerSidePropsContext } from 'next'
import { useEffect, useState } from 'react'
import TechAdminTaskTable from 'frontend/components/Tables/TaskTable/TechAdminTaskTable'
import dbConnect from 'lib/dbConnect'
import { formatIds } from 'lib/utils'
import { ITask } from 'backend/models/interfaces'
import Task from 'backend/models/Task'
import Link from 'next/link'
import { BsPlus } from 'react-icons/bs'
import { Button } from 'flowbite-react'

interface ITaskProps{
    tasks:ITask[]
}

export default function TechAdminTasks({tasks}:ITaskProps){



    return(
        <>
            <div className='flex justify-between items-center mb-5 bg-teal-400 p-5 rounded-md'>
                <h2 className='text-lg text-teal-50'>Tareas pendientes</h2>
                <Link href='/tech-admin/tasks/new'>
                    <Button className='flex justify-between items-center bg-teal-200 text-teal-600 hover:bg-teal-600 hover:text-teal-200'>
                        <BsPlus size='30'/>
                        <h4>
                            Delegar tarea
                        </h4>
                    </Button>
                </Link>
            </div>
            <hr className='mb-2' />
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