import { ITask } from 'backend/models/interfaces'

import Item from './Item'
import {Table} from 'flowbite-react'
export default function TechAdminTaskTable({tasks}:{tasks:ITask[]}){
    return(
        <>
            <Table hoverable={true}>
                <Table.Head className='bg-teal-400 text-teal-50'>
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
                <Table.Body >
                    {tasks.map((task, index) => <Item key={index} task={task}/>)}
                </Table.Body>
            </Table>
        </>
    )
}

