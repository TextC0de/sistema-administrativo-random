'use client';
import TechAdminTaskForm, {
    type ITaskForm,
} from '@/components/Forms/TechAdmin/TechAdminTaskForm';
import {
    type IBranch,
    type IBusiness,
    type IClient,
    type ITask,
    type IUser,
} from 'backend/models/interfaces';

interface Props {
    task: ITask;
    branches: IBranch[];
    clients: IClient[];
    businesses: IBusiness[];
    technicians: IUser[];
}

export default function TaskView({
    task,
    branches,
    clients,
    businesses,
    technicians,
}: Props): JSX.Element {
    const form: ITaskForm = {
        _id: task._id as string,
        branch: task.branch,
        business: task.business,
        assigned: task.assigned,
        taskType: task.taskType,
        openedAt: task.openedAt,
        status: task.status,
        description: task.description,
    };

    return (
        <>
            <TechAdminTaskForm
                taskForm={form}
                newTask={false}
                businesses={businesses}
                branches={branches}
                clients={clients}
                technicians={technicians}
            />
        </>
    );
}
