import Provinces from './Content';

import dbConnect from '@/lib/dbConnect';
import { formatIds } from '@/lib/utils';
import ProvinceModel from 'backend/models/Province';

const getData = async () => {
    await dbConnect();
    const docProvinces = await ProvinceModel.findUndeleted({});
    const provinces = formatIds(docProvinces);
    return provinces;
};

const Page = async () => {
    const provinces = await getData();
    return <Provinces provinces={provinces} />;
};

export default Page;
