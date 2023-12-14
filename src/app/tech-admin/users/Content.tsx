'use client';
import UserTable from '@/components/Tables/UserTable';
import TitleButton from '@/components/TitleButton';
import { type IUser } from 'backend/models/interfaces';

interface Props {
    users: IUser[];
}

export default function Users({ users }: Props): JSX.Element {
    return (
        <>
            <TitleButton
                title="Usuarios"
                path="/tech-admin/users/new"
                nameButton="Agregar usuario"
            />
            <UserTable users={users} />
        </>
    );
}
