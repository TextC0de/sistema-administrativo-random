import { ICity } from 'backend/models/interfaces'
import Link from 'next/link'
import * as apiEndpoints from 'lib/apiEndpoints'
import { slugify } from 'lib/utils'
import fetcher from 'lib/fetcher'
import useLoading from 'frontend/hooks/useLoading'
import { useState } from 'react'
import {BsFillPencilFill, BsFillTrashFill} from 'react-icons/bs'
import { Table } from 'flowbite-react'
import Modal from 'frontend/components/Modal'
import { useRouter } from 'next/router'

interface props{
    city:ICity,
    deleteCity: (id:string ) => void
}

export default function Item({city, deleteCity}:props){
    const router = useRouter()
    const [modal, setModal] = useState(false);
    const openModal = () => {
        setModal(true);
    };
    const closeModal = () => {
        setModal(false);
    };
    const {startLoading, stopLoading} = useLoading()

    const deleteData = async () => {
        try {
            await fetcher.delete({_id:city._id}, apiEndpoints.techAdmin.cities)
            deleteCity(city._id as  string)
        } 
        catch (error) {
            console.log(error)
        }
    }

    async function navigateEdit(){
        startLoading()
        await router.push(`/tech-admin/cities/${slugify(city.name)}`)
        stopLoading()
    }

    return(
        <Table.Row className='border-b'>
            <Table.Cell>{city.name}</Table.Cell>
            <Table.Cell>{city.province.name}</Table.Cell>
            <Table.Cell>
                <div className='flex justify-center gap-2 items-center'>
                    <button className='p-0.5 hover:bg-gray-200 rounder-lg' onClick={navigateEdit}>
                        <BsFillPencilFill color="gray" size="15"/>
                    </button>
                    <button className='p-0.5 hover:bg-gray-200 rounder-lg' onClick={openModal}>
                        <BsFillTrashFill color="gray" size="15"/>
                    </button>       
                    <Modal openModal={modal} handleToggleModal={closeModal} handleDelete={deleteData}/>
                </div>
            </Table.Cell>
        </Table.Row>
    )
}