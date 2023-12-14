import ClientView from './Content';

import dbConnect from '@/lib/dbConnect';
import { deSlugify, formatIds } from '@/lib/utils';
import BusinessModel from 'backend/models/Business';
import CityModel from 'backend/models/City';
import ClientModel from 'backend/models/Client';
import ProvinceModel from 'backend/models/Province';

const getData = async (name: string) => {
    await dbConnect();
    const client = await ClientModel.findOne({ name: deSlugify(name) });
    if (client == null) return null;
    const branches = await client.getBranches();
    const cities = await CityModel.findUndeleted();
    const provinces = await ProvinceModel.findUndeleted();
    const businesses = await BusinessModel.findUndeleted();
    const props = formatIds({ client, branches, cities, provinces, businesses });
    return { props };
};

const Page = async ({
    params,
}: {
    params: {
        name: string;
    };
}) => {
    const props = await getData(params.name);

    if (props == null) return <div>Client not found</div>;

    return (
        <ClientView
            client={props.props.client}
            branches={props.props.branches}
            cities={props.props.cities}
            provinces={props.props.provinces}
            businesses={props.props.businesses}
        />
    );
};

export default Page;
