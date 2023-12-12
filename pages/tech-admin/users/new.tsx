import City from 'backend/models/City';
import { type ICity } from 'backend/models/interfaces';
import { type Role } from 'backend/models/types';
import UserForm, { type IUserForm } from 'frontend/components/Forms/TechAdmin/UserForm';
import dbConnect from 'lib/dbConnect';
import { formatIds } from 'lib/utils';

interface props {
    cities: ICity[];
}

export default function NewUser({ cities }: props): JSX.Element {
    const userForm: IUserForm = {
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        roles: [] as Role[],
        city: {} as ICity,
        password: '',
    };
    return (
        <>
            <UserForm userForm={userForm} newUser={true} cities={cities} />
        </>
    );
}

export async function getServerSideProps(): Promise<{ props: props }> {
    await dbConnect();
    const docCities = await City.findUndeleted({});
    return { props: { cities: formatIds(docCities) } };
}
