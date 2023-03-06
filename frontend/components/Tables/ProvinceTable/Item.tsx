import { IProvince } from 'backend/models/interfaces'
import Link from 'next/link'
import * as apiEndpoints from 'lib/apiEndpoints'
import { slugify } from 'lib/utils'
import fetcher from 'lib/fetcher'
import useLoading from 'frontend/hooks/useLoading'
import { useState } from 'react'
import { Table } from 'flowbite-react'
import {BsFillPencilFill, BsFillTrashFill} from 'react-icons/bs'
import Modal from 'frontend/components/Modal'

interface props{
    province:IProvince,
    deleteProvince: (id:string) => void
}

export default function Item({province, deleteProvince}:props){

    const {startLoading, stopLoading} = useLoading()
    const router = useRouter()
    
    const [toggleModal, setToggleModal] = useState(false);
    function openModal(){
        setToggleModal(true)
    }        
    function closeModal(){
        setToggleModal(false)
    }    

    const deleteData = async () => {
        try {
            await fetcher.delete({_id:province._id}, apiEndpoints.techAdmin.provinces)
            deleteProvince(province._id as string)
        } 
        catch (error) {
            console.log(error)
        }
    }

    async function navigateEdit(){
        startLoading()
        await router.push(`/tech-admin/provinces/${slugify(province.name)}`)
        stopLoading()
    }

    return(
        <Table.Row className='border-b'>
            <Table.Cell>{province.name}</Table.Cell>
            <Table.Cell>
            <div className='flex justify-center gap-2 items-center'>
                    <button className='p-0.5 hover:bg-gray-200 rounder-lg' onClick={navigateEdit}>
                        <BsFillPencilFill color="gray" size="15"/>
                    </button>
                    <button className='p-0.5 hover:bg-gray-200 rounder-lg' onClick={deleteData}>
                        <BsFillTrashFill color="gray" size="15"/>
                    </button>       

                    <Modal openModal={toggleModal} handleToggleModal={closeModal} handleDelete={deleteData}/>
                </div>
            </Table.Cell>
        </Table.Row>
    )
}