'use client';
import UserForm, { type IUserForm } from '@/components/Forms/TechAdmin/UserForm';
import { type ICity, type IUser } from 'backend/models/interfaces';
import { type Role } from 'backend/models/types';

interface Props {
    cities: ICity[];
    user: IUser;
}

export default function EditUser({ cities, user }: Props): JSX.Element {
    const userForm: IUserForm = {
        _id: user._id as string,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roles: user.roles as Role[],
        city: user.city as ICity,
        password: '',
    };
    return (
        <>
            <UserForm userForm={userForm} newUser={false} cities={cities} />
        </>
    );
}
