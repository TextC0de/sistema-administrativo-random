import Cities from './Content';

import dbConnect from '@/lib/dbConnect';
import { formatIds } from '@/lib/utils';
import CityModel from 'backend/models/City';
import ProvinceModel from 'backend/models/Province';

const getData = async () => {
    await dbConnect();
    const cities = await CityModel.findUndeleted();
    const provinces = await ProvinceModel.findUndeleted();
    const props = formatIds({ cities, provinces });
    return props;
};

const Page = async () => {
    const props = await getData();
    return <Cities cities={props.cities} provinces={props.provinces} />;
};

export default Page;
