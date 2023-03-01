import { Button, Table } from 'flowbite-react'
import { IClient } from 'backend/models/interfaces'
import {BsFillPencilFill, BsFillTrashFill} from 'react-icons/bs'
import Link from 'next/link'
import * as apiEndpoints from 'lib/apiEndpoints'
import mongoose from 'mongoose'
import { useRouter } from 'next/router'
import { slugify } from 'lib/utils'
import fetcher from 'lib/fetcher'
import useLoading from 'frontend/hooks/useLoading'

interface props{
    client:IClient,
    deleteClient: (id:string | mongoose.Schema.Types.ObjectId) => void
}

export default function Item({client, deleteClient}:props){
    const {startLoading, stopLoading} = useLoading()
    const router = useRouter()
    
    async function handleClick(){
        startLoading()
        await router.push(`/tech-admin/clients/${slugify(client.name)}/branches`)
        stopLoading()
    }

    async function navigateEdit(){
        startLoading()
        await router.push(`/tech-admin/clients/${slugify(client.name)}/edit`)
        stopLoading()
    }

    const deleteData = async () => {
        try {
            await fetcher.delete({_id:client._id}, apiEndpoints.techAdmin.clients)
            deleteClient(client._id as string)
        } 
        catch (error) {
            console.log(error)
        }
    }

    return(
        <Table.Row className='border-b'>
            <Table.Cell onClick={handleClick}>{client.name}</Table.Cell>
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