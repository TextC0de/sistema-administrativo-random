'use client';
import CityForm, { type ICityForm } from '@/components/Forms/TechAdmin/CityForm';
import { type ICity, type IProvince } from 'backend/models/interfaces';

interface Props {
    city: ICity;
    provinces: IProvince[];
}

function CityView({ city, provinces }: Props): JSX.Element {
    const cityForm: ICityForm = {
        _id: city._id as string,
        name: city.name,
        province: city.province as IProvince,
    };

    return (
        <>
            <CityForm newCity={false} cityForm={cityForm} provinces={provinces} />
        </>
    );
}

export default CityView;
