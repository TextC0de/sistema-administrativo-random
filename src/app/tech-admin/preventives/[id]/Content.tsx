'use client';
import PreventiveForm, {
    type IPreventiveForm,
} from '@/components/Forms/TechAdmin/PreventiveForm';
import {
    type IBranch,
    type IBusiness,
    type IClient,
    type IUser,
    type IPreventive,
} from 'backend/models/interfaces';
import { type Frequency, type Month } from 'backend/models/types';

interface Props {
    preventive: IPreventive;
    branches: IBranch[];
    clients: IClient[];
    businesses: IBusiness[];
    technicians: IUser[];
}

export default function NewTask({
    branches,
    clients,
    businesses,
    technicians,
    preventive,
}: Props): JSX.Element {
    const preventiveFormProps = { branches, clients, businesses, technicians };

    const preventiveForm: IPreventiveForm = {
        _id: preventive._id as string,
        branch: preventive.branch,
        business: preventive.business,
        assigned: preventive.assigned,
        months: preventive.months as Month[],
        frequency: preventive.frequency as Frequency,
        status: preventive.status,
        lastDoneAt: preventive.lastDoneAt,
        batteryChangedAt: preventive.batteryChangedAt,
        observations: preventive.observations,
    };

    return (
        <>
            <PreventiveForm
                newPreventive={false}
                preventiveForm={preventiveForm}
                {...preventiveFormProps}
            />
        </>
    );
}
