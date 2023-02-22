import { dmyDateString } from 'lib/utils'
import { ITask } from 'backend/models/interfaces'
import {BsFillPencilFill, BsFillTrashFill} from 'react-icons/bs'
import Link from 'next/link'
import { Badge, Button, Table } from 'flowbite-react'
import { useState } from 'react'
import Modal from 'frontend/components/Modal'
import DeleteModal from 'frontend/components/DeleteModal'

interface props{
    task: ITask,
    deleteTask: (id:string) => void,
}
export default function Item({task, deleteTask}:props){
    const openedAt = dmyDateString(new Date(task.openedAt))
    const closedAt = task.closedAt? dmyDateString(new Date(task.closedAt)): task.closedAt
    
    const [openModal, setOpenModal] = useState(false);
    const handleToggleModal = () => {
        setOpenModal(!openModal);
    };
    const handleDelete = () =>{
        //TODO: agregar fetch de delete a la base de datos aca
        deleteTask(task._id as string)
    }
    return (
        <Table.Row className='border-b'>
            <Table.Cell>{openedAt}</Table.Cell>
            <Table.Cell>{task.business.name}</Table.Cell>
            <Table.Cell>{task.branch.client.name}</Table.Cell>
            <Table.Cell>{`${task.branch.number}, ${task.branch.city.name}, ${task.branch.city.province.name}`}</Table.Cell>
            <Table.Cell>{task.assigned? task.assigned.fullName:'Sin asignar' }</Table.Cell>
            <Table.Cell>{task.taskType}</Table.Cell>
            <Table.Cell><Badge color='warning'>{task.status}</Badge></Table.Cell>
            <Table.Cell>{closedAt? closedAt :''}</Table.Cell>
            <Table.Cell>
                <div className='flex justify-evenly items-center'>
                    <Link href='/tech-admin/tasks/[id]' as={`/tech-admin/tasks/${task._id}`}>
                        <button className='p-0.5 hover:bg-gray-200 rounder-lg'>
                            <BsFillPencilFill color="gray" size="15"/>
                        </button>
                    </Link>
                    <button onClick={handleToggleModal} className='p-0.5 hover:bg-gray-200 rounder-lg'>
                        <BsFillTrashFill color="gray" size="15"/>
                    </button>
                    <Modal openModal={openModal} handleToggleModal={handleToggleModal} handleDelete={handleDelete}/>
                    <DeleteModal openModal={openModal} handleToggleModal={handleToggleModal} handleDelete={handleDelete}/>
                </div>
            </Table.Cell>
        </Table.Row>

    )
}