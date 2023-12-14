'use client';
import UserForm, { type IUserForm } from '@/components/Forms/TechAdmin/UserForm';
import { type ICity } from 'backend/models/interfaces';
import { type Role } from 'backend/models/types';

interface Props {
    cities: ICity[];
}

export default function NewUser({ cities }: Props): JSX.Element {
    const userForm: IUserForm = {
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        roles: [] as Role[],
        city: {} as ICity,
        password: '',
    };

    return <UserForm userForm={userForm} newUser={true} cities={cities} />;
}
