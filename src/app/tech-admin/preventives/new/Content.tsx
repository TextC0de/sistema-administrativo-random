'use client';
import PreventiveForm, {
    type IPreventiveForm,
} from '@/components/Forms/TechAdmin/PreventiveForm';
import {
    type IBranch,
    type IBusiness,
    type IClient,
    type IUser,
} from 'backend/models/interfaces';
import { type Month } from 'backend/models/types';

interface Props {
    branches: IBranch[];
    clients: IClient[];
    businesses: IBusiness[];
    technicians: IUser[];
}

export default function NewTask(props: Props): JSX.Element {
    const preventiveForm: IPreventiveForm = {
        _id: '',
        branch: {} as IBranch,
        business: {} as IBusiness,
        assigned: [] as IUser[],
        months: [] as Month[],
        status: 'Pendiente',
    };

    return (
        <>
            <PreventiveForm preventiveForm={preventiveForm} {...props} />
        </>
    );
}
