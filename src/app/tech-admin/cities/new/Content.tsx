'use client';
import CityForm, { type ICityForm } from '@/components/Forms/TechAdmin/CityForm';
import { type IProvince } from 'backend/models/interfaces';

interface Props {
    provinces: IProvince[];
}

function NewCity({ provinces }: Props): JSX.Element {
    const cityForm: ICityForm = {
        _id: '',
        name: '',
        province: {} as IProvince,
    };

    return (
        <>
            <CityForm cityForm={cityForm} provinces={provinces} />
        </>
    );
}

export default NewCity;
