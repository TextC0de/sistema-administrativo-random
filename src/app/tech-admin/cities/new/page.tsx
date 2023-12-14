import NewCity from './Content';

import dbConnect from '@/lib/dbConnect';
import { formatIds } from '@/lib/utils';
import ProvinceModel from 'backend/models/Province';

async function getData() {
    await dbConnect();
    const docProvinces = await ProvinceModel.findUndeleted({});
    const provinces = formatIds(docProvinces);
    return provinces;
}

const Page = async () => {
    const provinces = await getData();
    return <NewCity provinces={provinces} />;
};

export default Page;
