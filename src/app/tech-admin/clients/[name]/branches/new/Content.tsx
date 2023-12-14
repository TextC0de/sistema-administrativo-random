'use client';

import ClientBranchForm, {
    type IClientBranchForm,
} from '@/components/Forms/TechAdmin/ClientBranchForm';
import { type IBusiness, type ICity, type IClient } from 'backend/models/interfaces';

interface Props {
    cities: ICity[];
    client: IClient;
    businesses: IBusiness[];
}

export default function NewClientBranch({
    cities,
    client,
    businesses,
}: Props): JSX.Element {
    const branchForm: IClientBranchForm = {
        _id: '',
        number: '',
        client,
        city: {} as ICity,
        businesses: [],
    };

    return (
        <>
            <ClientBranchForm
                branchForm={branchForm}
                cities={cities}
                businesses={businesses}
            />
        </>
    );
}
