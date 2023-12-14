import EditClientBranch from './Content';

import dbConnect from '@/lib/dbConnect';
import { formatIds } from '@/lib/utils';
import BranchModel, { Branch } from 'backend/models/Branch';
import BusinessModel from 'backend/models/Business';
import CityModel from 'backend/models/City';

const getData = async (number: string) => {
    await dbConnect();
    const docCities = await CityModel.findUndeleted({});
    const docBranch = await BranchModel.findOne({ number: number }).populate(
        Branch.getPopulateParameters(),
    );
    const docBusinesses = await BusinessModel.findUndeleted({});

    return {
        cities: formatIds(docCities),
        branch: formatIds(docBranch),
        businesses: formatIds(docBusinesses),
    };
};

const Page = async ({
    params,
}: {
    params: {
        number: string;
    };
}) => {
    const props = await getData(params.number);
    return (
        <EditClientBranch
            cities={props.cities}
            branch={props.branch}
            businesses={props.businesses}
        />
    );
};

export default Page;
