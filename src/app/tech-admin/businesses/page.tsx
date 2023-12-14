import Businesses from './Content';

import dbConnect from '@/lib/dbConnect';
import { formatIds } from '@/lib/utils';
import BusinessModel from 'backend/models/Business';

const getData = async () => {
    await dbConnect();
    const docBusinesses = await BusinessModel.findUndeleted({});
    return formatIds(docBusinesses);
};

const Page = async () => {
    const businesses = await getData();

    if (!businesses) {
        return <div>Loading...</div>;
    }

    return <Businesses businesses={businesses} />;
};

export default Page;
