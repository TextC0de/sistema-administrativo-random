'use client';
import TechAdminTaskForm, {
    type ITaskForm,
} from '@/components/Forms/TechAdmin/TechAdminTaskForm';
import {
    type IBranch,
    type IBusiness,
    type IClient,
    type IUser,
} from 'backend/models/interfaces';

interface Props {
    branches: IBranch[];
    clients: IClient[];
    businesses: IBusiness[];
    technicians: IUser[];
}

export default function NewTask(props: Props): JSX.Element {
    const taskForm: ITaskForm = {
        _id: '',
        branch: {} as IBranch,
        business: {} as IBusiness,
        assigned: [] as IUser[],
        taskType: '',
        openedAt: {} as Date,
        status: '',
        description: '',
    };

    return (
        <>
            <TechAdminTaskForm newTask={true} taskForm={taskForm} {...props} />
        </>
    );
}
