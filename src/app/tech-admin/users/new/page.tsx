import NewUser from './Content';

import dbConnect from '@/lib/dbConnect';
import { formatIds } from '@/lib/utils';
import CityModel from 'backend/models/City';

const getData = async () => {
    await dbConnect();
    const docCities = await CityModel.findUndeleted({});
    return { cities: formatIds(docCities) };
};

const Page = async () => {
    const props = await getData();
    return <NewUser cities={props.cities} />;
};

export default Page;
