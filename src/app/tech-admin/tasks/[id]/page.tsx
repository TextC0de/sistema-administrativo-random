import TaskView from './Content';

import dbConnect from '@/lib/dbConnect';
import { formatIds } from '@/lib/utils';
import BranchModel from 'backend/models/Branch';
import BusinessModel from 'backend/models/Business';
import ClientModel from 'backend/models/Client';
import TaskModel from 'backend/models/Task';
import UserModel from 'backend/models/User';

const getData = async (id: string) => {
    await dbConnect();
    const docTask = await TaskModel.findById(id).populate(
        TaskModel.getPopulateParameters(),
    );
    if (docTask == null) return null;

    const task = formatIds(docTask);
    const docBranches = await BranchModel.findUndeleted({});
    const docClients = await ClientModel.findUndeleted({});
    const docBusinesses = await BusinessModel.findUndeleted({});
    const docTechnicians = await UserModel.findUndeleted({ roles: 'Tecnico' });
    const branches = formatIds(docBranches);
    const clients = formatIds(docClients);
    const businesses = formatIds(docBusinesses);
    const technicians = formatIds(docTechnicians);
    return { task, branches, clients, businesses, technicians };
};

const Page = async ({ id }: { id: string }) => {
    const props = await getData(id);

    if (!props) {
        return null;
    }

    return (
        <TaskView
            task={props.task}
            branches={props.branches}
            clients={props.clients}
            businesses={props.businesses}
            technicians={props.technicians}
        />
    );
};

export default Page;
