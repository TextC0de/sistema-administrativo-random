'use client';

import BusinessForm, {
    type IBusinessForm,
} from '@/components/Forms/TechAdmin/BusinessForm';
import { type IBusiness } from 'backend/models/interfaces';

export interface Props {
    business: IBusiness;
}

function EditBusiness({ business }: Props): JSX.Element {
    const businessForm: IBusinessForm = {
        _id: business._id as string,
        name: business.name,
    };
    return <BusinessForm newBusiness={false} businessForm={businessForm} />;
}

export default EditBusiness;
