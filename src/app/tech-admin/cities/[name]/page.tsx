import CityView from './Content';

import dbConnect from '@/lib/dbConnect';
import { deSlugify, formatIds } from '@/lib/utils';
import CityModel from 'backend/models/City';
import ProvinceModel from 'backend/models/Province';

async function getData(name: string) {
    await dbConnect();
    const docCity = await CityModel.findOneUndeleted({
        name: deSlugify(name),
    });

    const docProvinces = await ProvinceModel.findUndeleted({});

    let city = null;
    if (docCity) {
        city = formatIds(docCity);
    }

    const provinces = formatIds(docProvinces);

    return { city, provinces };
}

const Page = async ({
    params,
}: {
    params: {
        name: string;
    };
}) => {
    const { city, provinces } = await getData(params.name);

    if (city === null) return <div>City not found</div>;

    return <CityView city={city} provinces={provinces} />;
};

export default Page;
