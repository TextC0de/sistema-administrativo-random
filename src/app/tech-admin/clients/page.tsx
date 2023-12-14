import Clients from './Content';

import dbConnect from '@/lib/dbConnect';
import { formatIds } from '@/lib/utils';
import ClientModel from 'backend/models/Client';

const getData = async () => {
    await dbConnect();
    const docClients = await ClientModel.findUndeleted({});
    const clients = formatIds(docClients);
    return { clients };
};

const Page = async () => {
    const { clients } = await getData();
    return <Clients clients={clients} />;
};

export default Page;
