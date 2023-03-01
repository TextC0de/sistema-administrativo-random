import { ITask } from 'backend/models/interfaces'
import Item from './Item'
import {Table} from 'flowbite-react'
import { useState } from 'react'

export default function TechAdminTaskTable({tasks}:{tasks:ITask[]}){
    const [tableTasks, setTableTasks] = useState<ITask[]>(tasks)

    const deleteTask = (id:string) =>{
        const newTable = (prev:ITask[]) => prev.filter(task => task._id !== id)
        setTableTasks(newTable(tableTasks))
    }
    return(
        <div className='bg-white sm:rounded-none shadow-gray-100'>
            <Table hoverable={true} className='bg-white'>
                <Table.Head className='bg-white border-b'>
                    <Table.HeadCell>Fecha apertura</Table.HeadCell>
                    <Table.HeadCell>Empresa</Table.HeadCell>
                    <Table.HeadCell>Cliente</Table.HeadCell>
                    <Table.HeadCell>Sucursal</Table.HeadCell>
                    <Table.HeadCell>Tecnico Asignado</Table.HeadCell>
                    <Table.HeadCell>Tipo</Table.HeadCell>
                    <Table.HeadCell>Estado</Table.HeadCell>
                    <Table.HeadCell>Fecha cierre</Table.HeadCell>
                    <Table.HeadCell>Acciones</Table.HeadCell>
                </Table.Head >
                <Table.Body className='bg-white'>
                    {tableTasks.map((task, index) => <Item key={index} task={task} deleteTask={deleteTask}/>)}
                </Table.Body>
            </Table>
        </div>
    )
}

