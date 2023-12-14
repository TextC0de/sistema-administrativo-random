import ClientEdit from './Content';

import dbConnect from '@/lib/dbConnect';
import { formatIds } from '@/lib/utils';
import ClientModel from 'backend/models/Client';

const getData = async (name: string) => {
    await dbConnect();
    const docClient = await ClientModel.findOne({ name });
    const client = formatIds(docClient);
    return { client };
};

const Page = async ({
    params,
}: {
    params: {
        name: string;
    };
}) => {
    const props = await getData(params.name);
    return <ClientEdit client={props.client} />;
};

export default Page;
