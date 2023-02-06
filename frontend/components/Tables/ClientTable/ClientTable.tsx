import { Table } from 'flowbite-react'
import mongoose from 'mongoose'
import { useState } from 'react'
import { IClient } from 'backend/models/interfaces'
import Item from './Item'

interface props{
    clients:IClient[]
}
export default function ClientTable({clients}:props){
    const [tableClients, setTableClients] = useState<IClient[]>(clients)

    const deleteClient = (id:string | mongoose.Schema.Types.ObjectId) =>{
        const newTable = (prev:IClient[]) => prev.filter(client => client._id !== id)
        setTableClients(newTable(clients))
    }

    
    return(
        <div className='mb-6'>
            <Table hoverable={true} className='bg-white'>
                <Table.Head className='bg-white border-b'>
                    <Table.HeadCell>Nombre</Table.HeadCell>
                    <Table.HeadCell className='w-40 text-center'>Acciones</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {tableClients.map((client, index)=><Item key={index} client={client} deleteClient={deleteClient}/>)}
                </Table.Body>
            </Table>
        </div>
    )
}