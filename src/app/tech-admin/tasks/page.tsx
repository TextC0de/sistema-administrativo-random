import TechAdminTasks from './Content';

import dbConnect from '@/lib/dbConnect';
import { formatIds } from '@/lib/utils';
import BusinessModel from 'backend/models/Business';
import CityModel from 'backend/models/City';
import ClientModel from 'backend/models/Client';
import ProvinceModel from 'backend/models/Province';
import TaskModel from 'backend/models/Task';
import UserModel from 'backend/models/User';

export async function getData() {
    await dbConnect();
    const tasks = await TaskModel.findUndeleted({});
    if (tasks === null) return null;
    const cities = await CityModel.findUndeleted();
    const provinces = await ProvinceModel.findUndeleted();
    const clients = await ClientModel.findUndeleted();
    const businesses = await BusinessModel.findUndeleted();
    const techs = await UserModel.findUndeleted({ roles: 'Tecnico' });
    const props = formatIds({ tasks, cities, provinces, clients, businesses, techs });
    return props;
}

const Page = async () => {
    const props = await getData();

    if (!props) {
        return null;
    }

    return (
        <TechAdminTasks
            tasks={props.tasks}
            cities={props.cities}
            provinces={props.provinces}
            clients={props.clients}
            businesses={props.businesses}
            techs={props.techs}
        />
    );
};

export default Page;
