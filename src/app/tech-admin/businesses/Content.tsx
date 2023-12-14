'use client';
import BusinessTable from '@/components/Tables/BusinessTable';
import TitleButton from '@/components/TitleButton';
import { IBusiness } from 'backend/models/interfaces';

interface Props {
    businesses: IBusiness[];
}

function Businesses({ businesses }: Props): JSX.Element {
    return (
        <>
            <TitleButton
                title="Empresas"
                path="/tech-admin/businesses/new"
                nameButton="Agregar una empresa"
            />
            <BusinessTable businesses={businesses} />
        </>
    );
}

export default Businesses;
