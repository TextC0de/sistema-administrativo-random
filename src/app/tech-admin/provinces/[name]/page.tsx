import ProvinceView from './Content';

import dbConnect from '@/lib/dbConnect';
import { deSlugify, formatIds } from '@/lib/utils';
import ProvinceModel from 'backend/models/Province';

const getData = async (name: string) => {
    await dbConnect();
    const docProvince = await ProvinceModel.findOne({
        name: deSlugify(name),
    });
    const province = formatIds(docProvince);
    return province;
};

const Page = async ({
    params,
}: {
    params: {
        name: string;
    };
}) => {
    const province = await getData(params.name);
    return <ProvinceView province={province} />;
};

export default Page;
