import { Table } from 'flowbite-react';
import { useState } from 'react';

import Item from './Item';

import { type IClient } from 'backend/models/interfaces';

interface Props {
    clients: IClient[];
}
export default function ClientTable({ clients }: Props): JSX.Element {
    const [tableClients, setTableClients] = useState<IClient[]>(clients);

    const deleteClient = (id: string): void => {
        setTableClients(tableClients.filter((client) => client._id !== id));
    };

    return (
        <div className="mb-6">
            <Table hoverable={true} className="bg-white">
                <Table.Head className="border-b bg-white">
                    <Table.HeadCell>Nombre</Table.HeadCell>
                    <Table.HeadCell className="w-40 text-center">Acciones</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {tableClients.map((client, index) => (
                        <Item key={index} client={client} deleteClient={deleteClient} />
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}
