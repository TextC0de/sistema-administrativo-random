'use client';

import ProvinceTable from '@/components/Tables/ProvinceTable';
import TitleButton from '@/components/TitleButton';
import { type IProvince } from 'backend/models/interfaces';

interface Props {
    provinces: IProvince[];
}

export default function Provinces({ provinces }: Props): JSX.Element {
    return (
        <>
            <TitleButton
                title="Provincias"
                path="/tech-admin/provinces/new"
                nameButton="Agregar provincia"
            />
            <ProvinceTable provinces={provinces} />
        </>
    );
}
