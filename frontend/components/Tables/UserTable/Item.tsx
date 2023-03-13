import { IUser } from 'backend/models/interfaces'
import Link from 'next/link'
import * as apiEndpoints from 'lib/apiEndpoints'
import fetcher from 'lib/fetcher'
import useLoading from 'frontend/hooks/useLoading'
import { useRouter } from 'next/router'
import useAlert from 'frontend/hooks/useAlert'
import { useState } from 'react'
import { Table } from 'flowbite-react'
import {CgPassword} from 'react-icons/cg'
import {BsFillPencilFill, BsFillTrashFill} from 'react-icons/bs'
import Modal from 'frontend/components/Modal'

interface props{
    user:IUser,
    deleteUser: (id:string ) => void
}

export default function Item({user, deleteUser}:props){

    const {startLoading, stopLoading} = useLoading()
    const router = useRouter()
    const [modal, setModal] = useState(false);
    const {triggerAlert} = useAlert()

    const openModal = () => {
        setModal(true);
    };
    
    const closeModal = () => {
        setModal(false);
    };
    const deleteData = async () => {
        try {
            await fetcher.delete({_id:user._id}, apiEndpoints.techAdmin.users)
            deleteUser(user._id as string)
            triggerAlert({type:'Success', message:`El usuario ${user.firstName} ${user.lastName} fue eliminado correctamente`})
        } 
        catch (error) {
            console.log(error)
            triggerAlert({type:'Failure', message:`No se pudo eliminar el usuario ${user.firstName} ${user.lastName}`})
        }
    }

    async function navigateEdit(){
        startLoading()
        await router.push(`/tech-admin/users/${user._id}`)
        stopLoading()
    }

    async function reGeneratePassword(){        
        try {
            startLoading()
            await fetcher.put({_id:user._id}, apiEndpoints.techAdmin.users + 'new-password')
            stopLoading()
        } 
        catch (error) {
            console.log(error)
            stopLoading()
        }
    }

    return(
        <Table.Row className='border-b '>
            <Table.Cell>{user.fullName}</Table.Cell>
            <Table.Cell>{user.city?`${user.city?.name}, ${user.city?.province.name}`:''}</Table.Cell>
            <Table.Cell>{(user.roles?.length as number) > 1 ? user.roles?.map(role=> `${role}, `) : user.roles?.[0]}</Table.Cell>
            <Table.Cell>
            <div className='flex justify-center gap-2 items-center'>
                    <button className='p-0.5 hover:bg-gray-200 rounder-lg' onClick={navigateEdit}>
                        <BsFillPencilFill color="gray" size="15"/>
                    </button>
                    <button className='p-0.5 hover:bg-gray-200 rounder-lg' onClick={openModal}>
                        <BsFillTrashFill color="gray" size="15"/>
                    </button>   
                    <button className='p-0.5 hover:bg-gray-200 rounder-lg' onClick={reGeneratePassword}>
                        <CgPassword color='gray' size='15'/>
                    </button>
                    <Modal openModal={modal} handleToggleModal={closeModal} handleDelete={deleteData}/>
                </div>
            </Table.Cell>
        </Table.Row>
    )
}