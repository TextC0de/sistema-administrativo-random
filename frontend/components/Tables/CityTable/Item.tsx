import { Button, Table } from 'flowbite-react'
import { ICity } from 'backend/models/interfaces'
import {BsFillPencilFill, BsFillTrashFill} from 'react-icons/bs'
import Link from 'next/link'
import * as apiEndpoints from 'lib/apiEndpoints'
import { useRouter } from 'next/router'
import mongoose from 'mongoose'
import { slugify } from 'lib/utils'
import fetcher from 'lib/fetcher'
import useLoading from 'frontend/hooks/useLoading'
interface props{
    city:ICity,
    deleteCity: (id:string | mongoose.Schema.Types.ObjectId) => void
}

export default function Item({city, deleteCity}:props){

    const {startLoading, stopLoading} = useLoading()
    const router = useRouter()
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
                    <button className='p-0.5 hover:bg-gray-200 rounder-lg' onClick={deleteData}>
                        <BsFillTrashFill color="gray" size="15"/>
                    </button>       
                </div>
            </Table.Cell>
        </Table.Row>
    )
}