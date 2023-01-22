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
            <Table hoverable={true}>
                <Table.Head className='bg-teal-400'>
                    <Table.HeadCell>Nombre</Table.HeadCell>
                    <Table.HeadCell></Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {tableClients.map((client, index)=><Item key={index} client={client} deleteClient={deleteClient}/>)}
                </Table.Body>
            </Table>
        </div>
    )
}