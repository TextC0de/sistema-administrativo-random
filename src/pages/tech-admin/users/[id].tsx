import { type GetServerSidePropsContext } from 'next';

import UserForm, { type IUserForm } from '@/components/Forms/TechAdmin/UserForm';
import dbConnect from '@/lib/dbConnect';
import { formatIds } from '@/lib/utils';
import City from 'backend/models/City';
import { type ICity, type IUser } from 'backend/models/interfaces';
import { type Role } from 'backend/models/types';
import User from 'backend/models/User';

interface props {
    cities: ICity[];
    user: IUser;
}

export default function EditUser({ cities, user }: props): JSX.Element {
    const userForm: IUserForm = {
        _id: user._id as string,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roles: user.roles as Role[],
        city: user.city as ICity,
        password: '',
    };

    return <UserForm userForm={userForm} newUser={false} cities={cities} />;
}

export async function getServerSideProps(
    ctx: GetServerSidePropsContext,
): Promise<{ props: props }> {
    const { params } = ctx;
    if (params?.id === undefined) return { props: {} as props };
    await dbConnect();
    const docUser = await User.findById(params.id).populate(User.getPopulateParameters());
    const docCities = await City.findUndeleted({});
    return { props: { cities: formatIds(docCities), user: formatIds(docUser) } };
}
