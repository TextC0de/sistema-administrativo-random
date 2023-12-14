import NewTask from './Content';

import dbConnect from '@/lib/dbConnect';
import { formatIds } from '@/lib/utils';
import BranchModel from 'backend/models/Branch';
import BusinessModel from 'backend/models/Business';
import ClientModel from 'backend/models/Client';
import Preventive from 'backend/models/Preventive';
import UserModel from 'backend/models/User';

const getData = async (id: string) => {
    await dbConnect();
    const preventive = await Preventive.findById(id).populate(
        Preventive.getPopulateParameters(),
    );
    if (preventive == null) return null;
    const branches = await BranchModel.findUndeleted({});
    const clients = await ClientModel.findUndeleted({});
    const businesses = await BusinessModel.findUndeleted({});
    const technicians = await UserModel.findUndeleted({ roles: 'Tecnico' });

    return formatIds({ branches, clients, businesses, technicians, preventive });
};

const Page = async ({
    params,
}: {
    params: {
        id: string;
    };
}) => {
    const props = await getData(params.id);
    if (props == null) return <></>;

    return (
        <NewTask
            preventive={props.preventive}
            branches={props.branches}
            clients={props.clients}
            businesses={props.businesses}
            technicians={props.technicians}
        />
    );
};

export default Page;
