import { Button, Table } from 'flowbite-react'
import { ICity } from 'backend/models/interfaces'
import {BsFillPencilFill, BsFillTrashFill} from 'react-icons/bs'
import Link from 'next/link'
import * as apiEndpoints from 'lib/apiEndpoints'
import { useRouter } from 'next/router'
import mongoose from 'mongoose'
import { slugify } from 'lib/utils'
import fetcher from 'lib/fetcher'
interface props{
    city:ICity,
    deleteCity: (id:string | mongoose.Schema.Types.ObjectId) => void
}

export default function Item({city, deleteCity}:props){

    const deleteData = async () => {
        try {
            await fetcher.delete({_id:city._id}, apiEndpoints.techAdmin.cities)
            deleteCity(city._id as  string)
        } 
        catch (error) {
            console.log(error)
        }
    }

    return(
        <Table.Row className='border-b'>
            <Table.Cell>{city.name}</Table.Cell>
            <Table.Cell>{city.province.name}</Table.Cell>
            <Table.Cell>
                <div className='flex justify-center gap-2 items-center'>
                <Link href='/tech-admin/cities/[name]' as={`/tech-admin/cities/${slugify(city.name)}`}>

                        <button className='p-0.5 hover:bg-gray-200 rounder-lg' >
                            <BsFillPencilFill color="gray" size="15"/>
                        </button>
                    </Link>
                    <button className='p-0.5 hover:bg-gray-200 rounder-lg' onClick={deleteData}>
                        <BsFillTrashFill color="gray" size="15"/>
                    </button>       
                </div>
            </Table.Cell>
        </Table.Row>
    )
}