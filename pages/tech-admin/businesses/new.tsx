import BusinessForm, {
    type IBusinessForm,
} from 'frontend/components/Forms/TechAdmin/BusinessForm';

export default function NewBusiness(): JSX.Element {
    const businessForm: IBusinessForm = {
        _id: '',
        name: '',
    };

    return (
        <>
            <BusinessForm newBusiness={true} businessForm={businessForm} />
        </>
    );
}
