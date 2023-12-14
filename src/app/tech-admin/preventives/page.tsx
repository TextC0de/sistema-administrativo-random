import Preventives from './Content';

import dbConnect from '@/lib/dbConnect';
import { formatIds } from '@/lib/utils';
import BusinessModel from 'backend/models/Business';
import CityModel from 'backend/models/City';
import ClientModel from 'backend/models/Client';
import Preventive from 'backend/models/Preventive';
import ProvinceModel from 'backend/models/Province';
import UserModel from 'backend/models/User';

export async function getData() {
    await dbConnect();
    const preventives = await Preventive.findUndeleted({});
    const cities = await CityModel.findUndeleted({});
    const provinces = await ProvinceModel.findUndeleted({});
    const techs = await UserModel.findUndeleted({ roles: 'Tecnico' });
    const businesses = await BusinessModel.findUndeleted();
    const clients = await ClientModel.findUndeleted();
    const props = formatIds({
        preventives,
        cities,
        provinces,
        techs,
        businesses,
        clients,
    });

    return props;
}

const Page = async () => {
    const props = await getData();
    return (
        <Preventives
            preventives={props.preventives}
            cities={props.cities}
            provinces={props.provinces}
            techs={props.techs}
            businesses={props.businesses}
            clients={props.clients}
        />
    );
};

export default Page;
