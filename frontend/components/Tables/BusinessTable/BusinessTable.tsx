import { Table } from 'flowbite-react'
import mongoose from 'mongoose'
import { useState } from 'react'
import { IBusiness } from 'backend/models/interfaces'
import Item from './Item'

interface props{
    businesses:IBusiness[]
}
export default function BusinessTable({businesses}:props){
    const [tableBusinesses, setTableBusinesses] = useState<IBusiness[]>(businesses)

    const deleteBusiness = (id:string | mongoose.Schema.Types.ObjectId) =>{
        const newTable = (prev:IBusiness[]) => prev.filter(business => business._id !== id)
        setTableBusinesses(newTable(tableBusinesses))
    }

    return(
        <div className='mb-6'>
            <Table hoverable={true} className='bg-white'>
                <Table.Head className='bg-white border-b'>
                    <Table.HeadCell>Nombre</Table.HeadCell>
                    <Table.HeadCell className='w-40 text-center'>Acciones</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {tableBusinesses.map((business, index)=><Item key={index} business={business} deleteBusiness={deleteBusiness}/>)}
                </Table.Body>
            </Table>
        </div>
    )
}