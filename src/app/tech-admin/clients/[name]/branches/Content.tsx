'use client';

import ClientBranchesTable from '@/components/Tables/ClientBranchesTable';
import TitleButton from '@/components/TitleButton';
import { slugify } from '@/lib/utils';
import {
    type IBranch,
    type IBusiness,
    type ICity,
    type IClient,
    type IProvince,
} from 'backend/models/interfaces';

interface Props {
    client: IClient;
    branches: IBranch[];
    cities: ICity[];
    provinces: IProvince[];
    businesses: IBusiness[];
}
export default function ClientView({
    client,
    branches,
    cities,
    provinces,
    businesses,
}: Props): JSX.Element {
    const name = `Cliente: ${client.name}`;
    return (
        <>
            <TitleButton
                title={name}
                path={`/tech-admin/clients/${slugify(client.name)}/branches/new`}
                nameButton="Agregar sucursal"
            />
            <ClientBranchesTable
                branches={branches}
                cities={cities}
                provinces={provinces}
                businesses={businesses}
            />
        </>
    );
}
