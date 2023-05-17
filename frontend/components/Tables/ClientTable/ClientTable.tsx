import { type IClient } from 'backend/models/interfaces'
import { useState } from 'react'
import { Table } from 'flowbite-react'
import Item from './Item'

interface props {
    clients: IClient[]
}
export default function ClientTable({ clients }: props) {
    const [tableClients, setTableClients] = useState<IClient[]>(clients)

    const deleteClient = (id: string) => {
        setTableClients(tableClients.filter(client => client._id !== id))
    }

    return (
        <div className='mb-6'>
            <Table hoverable={true} className='bg-white'>
                <Table.Head className='bg-white border-b'>
                    <Table.HeadCell>Nombre</Table.HeadCell>
                    <Table.HeadCell className='w-40 text-center'>Acciones</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {tableClients.map((client, index) => <Item key={index} client={client} deleteClient={deleteClient}/>)}
                </Table.Body>
            </Table>
        </div>
    )
}
