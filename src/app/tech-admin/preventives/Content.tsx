'use client';
import PreventiveTable from '@/components/Tables/PreventiveTable';
import TitleButton from '@/components/TitleButton';
import {
    type IBusiness,
    type ICity,
    type IPreventive,
    type IProvince,
    type IUser,
    type IClient,
} from 'backend/models/interfaces';

interface IPreventiveProps {
    preventives: IPreventive[];
    cities: ICity[];
    provinces: IProvince[];
    techs: IUser[];
    businesses: IBusiness[];
    clients: IClient[];
}

export default function Preventives(props: IPreventiveProps): JSX.Element {
    // const tableProps = {cities, provinces, techs, businesses, clients}

    return (
        <>
            <TitleButton
                title="Preventivos"
                path="/tech-admin/preventives/new"
                nameButton="Agregar preventivo"
            />
            <PreventiveTable {...props} />
        </>
    );
}
