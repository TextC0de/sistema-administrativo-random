'use client';
import CityTable from '@/components/Tables/CityTable';
import TitleButton from '@/components/TitleButton';
import { type ICity, type IProvince } from 'backend/models/interfaces';

interface Props {
    cities: ICity[];
    provinces: IProvince[];
}

function Cities({ cities, provinces }: Props): JSX.Element {
    return (
        <>
            <TitleButton
                title="Localidades"
                path="/tech-admin/cities/new"
                nameButton="Agregar localidad"
            />
            <CityTable cities={cities} provinces={provinces} />
        </>
    );
}

export default Cities;
