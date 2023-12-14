'use client';
import ClientForm, { type IClientForm } from '@/components/Forms/TechAdmin/ClientForm';
import { type IClient } from 'backend/models/interfaces';

interface Props {
    client: IClient;
}

export default function ClientEdit({ client }: Props): JSX.Element {
    const clientForm: IClientForm = {
        _id: client._id as string,
        name: client.name,
    };

    return (
        <>
            <ClientForm newClient={false} clientForm={clientForm} />
        </>
    );
}
