'use client';
import ClientBranchForm, {
    type IClientBranchForm,
} from '@/components/Forms/TechAdmin/ClientBranchForm';
import { type IBranch, type IBusiness, type ICity } from 'backend/models/interfaces';

interface Props {
    branch: IBranch;
    cities: ICity[];
    businesses: IBusiness[];
}

export default function EditClientBranch({
    branch,
    cities,
    businesses,
}: Props): JSX.Element {
    const branchForm: IClientBranchForm = {
        _id: branch._id.toString(),
        number: branch.number,
        client: branch.client,
        city: branch.city,
        businesses: branch.businesses,
    };

    return (
        <>
            <ClientBranchForm
                newBranch={false}
                branchForm={branchForm}
                cities={cities}
                businesses={businesses}
            />
        </>
    );
}
