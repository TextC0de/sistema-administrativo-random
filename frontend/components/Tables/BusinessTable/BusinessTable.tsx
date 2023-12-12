import { Table } from 'flowbite-react';
import { useState } from 'react';

import Item from './Item';

import { type IBusiness } from 'backend/models/interfaces';

interface props {
    businesses: IBusiness[];
}
export default function BusinessTable({ businesses }: props): JSX.Element {
    const [tableBusinesses, setTableBusinesses] = useState<IBusiness[]>(businesses);

    const deleteBusiness = (id: string): void => {
        const newTable = (prev: IBusiness[]): IBusiness[] =>
            prev.filter((business) => business._id !== id);
        setTableBusinesses(newTable(tableBusinesses));
    };

    return (
        <div className="mb-6">
            <Table hoverable={true} className="bg-white">
                <Table.Head className="border-b bg-white">
                    <Table.HeadCell>Nombre</Table.HeadCell>
                    <Table.HeadCell className="w-40 text-center">Acciones</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {tableBusinesses.map((business, index) => (
                        <Item
                            key={index}
                            business={business}
                            deleteBusiness={deleteBusiness}
                        />
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}
