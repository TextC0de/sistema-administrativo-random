import { Table } from 'flowbite-react';
import { useState } from 'react';

import Item from './Item';

import { type IUser } from 'backend/models/interfaces';

interface Props {
    users: IUser[];
}
export default function UserTable({ users }: Props): JSX.Element {
    const [tableUsers, setTableUsers] = useState<IUser[]>(users);

    const deleteUser = (id: string): void => {
        const newTable = (prev: IUser[]): IUser[] =>
            prev.filter((user) => user._id !== id);
        setTableUsers(newTable(users));
    };

    return (
        <div className="rounded-none shadow-none">
            <Table hoverable={true} className="rounded-none bg-white shadow-none">
                <Table.Head className="border-b bg-white">
                    <Table.HeadCell>Nombre</Table.HeadCell>
                    <Table.HeadCell>Ciudad</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Roles</Table.HeadCell>
                    <Table.HeadCell className="w-40 text-center">Acciones</Table.HeadCell>
                </Table.Head>
                <Table.Body className="rounded-none shadow-none">
                    {tableUsers.map((user, index) => (
                        <Item key={index} user={user} deleteUser={deleteUser} />
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}
