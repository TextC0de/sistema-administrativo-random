import EditBusiness from './Content';

import dbConnect from '@/lib/dbConnect';
import { deSlugify, formatIds } from '@/lib/utils';
import BusinessModel from 'backend/models/Business';

const getData = async (name: string) => {
    await dbConnect();
    const docBusiness = await BusinessModel.findOneUndeleted({
        name: deSlugify(name),
    });

    return formatIds(docBusiness);
};

const Page = async ({
    params,
}: {
    params: {
        name: string;
    };
}) => {
    const business = await getData(params.name);

    return <EditBusiness business={business} />;
};

export default Page;
