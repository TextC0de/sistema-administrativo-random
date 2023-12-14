import NewClientBranch from './Content';

import dbConnect from '@/lib/dbConnect';
import { deSlugify, formatIds } from '@/lib/utils';
import BusinessModel from 'backend/models/Business';
import CityModel from 'backend/models/City';
import ClientModel from 'backend/models/Client';

const getData = async (name: string) => {
    await dbConnect();
    const cities = await CityModel.findUndeleted({});
    const client = await ClientModel.findOne({ name: deSlugify(name) });
    const businesses = await BusinessModel.findUndeleted({});

    return { props: formatIds({ cities, client, businesses }) };
};

const Page = async ({
    params,
}: {
    params: {
        name: string;
    };
}) => {
    const props = await getData(params.name);
    return (
        <NewClientBranch
            cities={props.props.cities}
            client={props.props.client}
            businesses={props.props.businesses}
        />
    );
};

export default Page;
