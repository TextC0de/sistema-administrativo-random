'use client';
import ClientTable from '@/components/Tables/ClientTable';
import TitleButton from '@/components/TitleButton';
import { type IClient } from 'backend/models/interfaces';

interface Props {
    clients: IClient[];
}

export default function Clients({ clients }: Props): JSX.Element {
    return (
        <>
            <TitleButton
                title="Clientes"
                path="/tech-admin/clients/new"
                nameButton="Agregar cliente"
            />
            <ClientTable clients={clients} />
        </>
    );
}
