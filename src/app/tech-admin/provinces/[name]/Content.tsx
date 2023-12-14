'use client';
import ProvinceForm, {
    type IProvinceForm,
} from '@/components/Forms/TechAdmin/ProvinceForm';
import { type IProvince } from 'backend/models/interfaces';

interface Props {
    province: IProvince;
}

export default function ProvinceView({ province }: Props): JSX.Element {
    const provinceForm: IProvinceForm = {
        _id: province._id as string,
        name: province.name,
    };

    return (
        <>
            <ProvinceForm newProvince={false} provinceForm={provinceForm} />
        </>
    );
}
