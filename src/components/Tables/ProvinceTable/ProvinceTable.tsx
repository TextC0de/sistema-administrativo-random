import { Table } from 'flowbite-react';
import { useState } from 'react';

import Item from './Item';

import { type IProvince } from 'backend/models/interfaces';

interface Props {
    provinces: IProvince[];
}

export default function ProvinceTable({ provinces }: Props): JSX.Element {
    const [tableProvinces, setTableProvinces] = useState<IProvince[]>(provinces);
    const deleteProvince = async (id: string): Promise<void> => {
        setTableProvinces(tableProvinces.filter((province) => province._id !== id));
    };

    const handleDelete = (id: string): void => {
        void deleteProvince(id);
    };

    return (
        <>
            <Table hoverable={true} className="bg-white">
                <Table.Head className="border-b bg-white">
                    <Table.HeadCell>Nombre</Table.HeadCell>
                    <Table.HeadCell className="w-40 text-center">Acciones</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {tableProvinces.map((province, index) => (
                        <Item
                            key={index}
                            province={province}
                            deleteProvince={handleDelete}
                        />
                    ))}
                </Table.Body>
            </Table>
        </>
    );
}
