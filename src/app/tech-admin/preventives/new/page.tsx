import NewTask from './Content';

import dbConnect from '@/lib/dbConnect';
import { formatIds } from '@/lib/utils';
import BranchModel from 'backend/models/Branch';
import BusinessModel from 'backend/models/Business';
import ClientModel from 'backend/models/Client';
import UserModel from 'backend/models/User';

const getData = async () => {
    // ctx.res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=59')
    await dbConnect();
    const docBranches = await BranchModel.findUndeleted({});
    const docClients = await ClientModel.findUndeleted({});
    const docBusinesses = await BusinessModel.findUndeleted({});
    const docTechnicians = await UserModel.findUndeleted({ roles: 'Tecnico' });
    const branches = formatIds(docBranches);
    const clients = formatIds(docClients);
    const businesses = formatIds(docBusinesses);
    const technicians = formatIds(docTechnicians);
    return { branches, clients, businesses, technicians };
};

const Page = async () => {
    const props = await getData();

    return (
        <NewTask
            branches={props.branches}
            clients={props.clients}
            businesses={props.businesses}
            technicians={props.technicians}
        />
    );
};

export default Page;
