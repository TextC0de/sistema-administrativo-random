'use client';
import TechAdminTaskTable from '@/components/Tables/TaskTable/TechAdminTaskTable';
import TitleButton from '@/components/TitleButton';
import {
    type IBusiness,
    type ICity,
    type IClient,
    type IProvince,
    type ITask,
    type IUser,
} from 'backend/models/interfaces';

interface Props {
    tasks: ITask[];
    cities: ICity[];
    provinces: IProvince[];
    clients: IClient[];
    businesses: IBusiness[];
    techs: IUser[];
}

export default function TechAdminTasks(props: Props): JSX.Element {
    return (
        <>
            <TitleButton
                title="Tareas pendientes"
                path="/tech-admin/tasks/new"
                nameButton="Delegar tarea"
            />
            <TechAdminTaskTable {...props} />
        </>
    );
}
