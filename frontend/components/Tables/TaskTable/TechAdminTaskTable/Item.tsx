import { dmyDateString } from 'lib/utils'
import { ITask } from 'backend/models/interfaces'
import {BsFillPencilFill, BsFillTrashFill} from 'react-icons/bs'
import Link from 'next/link'
import { Badge, Button, Table } from 'flowbite-react'
import { useState } from 'react'
import DeleteModal from 'frontend/components/DeleteModal'
import fetcher from 'lib/fetcher'
import * as api from 'lib/apiEndpoints'
import { useRouter } from 'next/router'
import useLoading from 'frontend/hooks/useLoading'

interface props{
    task: ITask,
    deleteTask: (id:string) => void,
}
export default function Item({task, deleteTask}:props){
    const openedAt = dmyDateString(new Date(task.openedAt))
    const closedAt = task.closedAt? dmyDateString(new Date(task.closedAt)): task.closedAt

    const [modal, setModal] = useState(false);

    const {startLoading, stopLoading} = useLoading()
    const router = useRouter()
    

    async function navigateEdit(){
        startLoading()
        await router.push(`/tech-admin/tasks/${task._id}`)
        stopLoading()
    }

    const openModal = () => {
        setModal(true);
    };
    const closeModal = () => {
        setModal(false);
    };
    const handleDelete = async () =>{
        try {
            await fetcher.delete({_id:task._id}, api.techAdmin.tasks)
            deleteTask(task._id as string)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
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
                        <button className='p-0.5 hover:bg-gray-200 rounder-lg' onClick={navigateEdit}>
                            <BsFillPencilFill color="gray" size="15"/>
                        </button>
                        <button onClick={openModal} className='p-0.5 hover:bg-gray-200 rounder-lg'>
                            <BsFillTrashFill color="gray" size="15"/>
                        </button>
                    </div>
                </Table.Cell>
            </Table.Row> 
            <DeleteModal openModal={modal} handleToggleModal={closeModal} handleDelete={handleDelete}/>
        </>

    )
}