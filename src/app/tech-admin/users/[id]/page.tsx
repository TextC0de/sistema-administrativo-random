import EditUser from './Content';

import dbConnect from '@/lib/dbConnect';
import { formatIds } from '@/lib/utils';
import CityModel from 'backend/models/City';
import UserModel, { User } from 'backend/models/User';

async function getData(id: string) {
    await dbConnect();

    const docUser = await UserModel.findById(id).populate(User.getPopulateParameters());
    const docCities = await CityModel.findUndeleted({});

    return { cities: formatIds(docCities), user: formatIds(docUser) };
}

const Page = async ({
    params,
}: {
    params: {
        id: string;
    };
}) => {
    const props = await getData(params.id);
    return <EditUser cities={props.cities} user={props.user} />;
};

export default Page;
