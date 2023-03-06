import { IBusiness } from 'backend/models/interfaces'
import Link from 'next/link'
import * as apiEndpoints from 'lib/apiEndpoints'
import { slugify } from 'lib/utils'
import fetcher from 'lib/fetcher'
import useLoading from 'frontend/hooks/useLoading'

import { useState } from 'react'
import {BsFillPencilFill, BsFillTrashFill} from 'react-icons/bs'
import { Table } from 'flowbite-react'
import Modal from 'frontend/components/Modal'

interface props{
    business:IBusiness,
    deleteBusiness: (id:string) => void
}

export default function Item({business, deleteBusiness}:props){
    const router = useRouter()
    const {startLoading, stopLoading} = useLoading()    const [modal, setModal] = useState(false);
    const openModal = () => {
        setModal(true);
    };
    const closeModal = () => {
        setModal(false);
    };

    const deleteData = async () => {        
        try {
            await fetcher.delete({_id:business._id}, apiEndpoints.techAdmin.businesses)
            deleteBusiness(business._id as string)

        } 
        catch (error) {
            console.log(error)

        }
    }

    async function navigateEdit(){
        startLoading()
        await router.push(`/tech-admin/businesses/${slugify(business.name)}`)
        stopLoading()
    }

    return(
        <Table.Row className='border-b'>
            <Table.Cell >{business.name}</Table.Cell>
            <Table.Cell className='w-40'>
                <div className='flex justify-center gap-2 items-center'>
                    <button className='p-0.5 hover:bg-gray-200 rounder-lg' onClick={navigateEdit}>
                        <BsFillPencilFill color="gray" size="15"/>
                    </button>
                    <button className='p-0.5 hover:bg-gray-200 rounder-lg' onClick={deleteData}>
                        <BsFillTrashFill color="gray" size="15"/>
                    </button>    
                    <Modal openModal={modal} handleToggleModal={closeModal} handleDelete={deleteData}/>   
                </div>
            </Table.Cell>
        </Table.Row>
    )
}