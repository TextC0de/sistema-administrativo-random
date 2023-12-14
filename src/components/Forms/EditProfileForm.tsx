import { useRouter } from 'next/navigation';

import { Button, Label, TextInput } from 'flowbite-react';
import RSA from 'node-rsa';
import { type ChangeEvent, type FormEvent, useState } from 'react';

import { useUserContext } from '@/context/userContext/UserProvider';
import useAlert from '@/hooks/useAlert';
import useLoading from '@/hooks/useLoading';
import * as api from '@/lib/apiEndpoints';
import fetcher from '@/lib/fetcher';

interface IEditProfileForm {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

const emptyForm = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
};

export default function EditProfileForm(): JSX.Element {
    const [form, setForm] = useState<IEditProfileForm>(emptyForm);
    const [errors, setErrors] = useState<IEditProfileForm>(emptyForm);
    const { user } = useUserContext();
    const { triggerAlert } = useAlert();
    const { stopLoading, startLoading } = useLoading();
    const router = useRouter();

    const encryptPassword = (password: string): string => {
        const key = new RSA();
        key.importKey(user.publicKey, 'public');
        const encryptedPassword = key.encrypt(password, 'base64');
        return encryptedPassword;
    };

    async function validateForm(): Promise<IEditProfileForm> {
        let errs = emptyForm;
        if (form.currentPassword === '')
            errs = { ...errs, currentPassword: 'Introduzca su contraseña actual' };
        try {
            if (form.currentPassword !== '') {
                await fetcher.post(
                    { currentPassword: encryptPassword(form.currentPassword) },
                    api.checkPassword,
                );
            }
        } catch (e) {
            errs = { ...errs, currentPassword: 'Contraseña incorrecta' };
        }
        if (form.newPassword === '')
            errs = { ...errs, newPassword: 'Introduzca una nueva contraseña' };
        if (form.confirmNewPassword === '')
            errs = { ...errs, confirmNewPassword: 'Confirme su nueva contraseña' };
        if (form.newPassword !== form.confirmNewPassword) {
            errs = {
                ...errs,
                newPassword: 'Las contraseñas no coinciden',
                confirmNewPassword: 'Las contraseñas no coinciden',
            };
        }
        setErrors(errs);
        return errs;
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        const { value, name } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    }

    async function goBack(): Promise<void> {
        startLoading();
        await router.push('/');
        stopLoading();
    }

    async function submit(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        const errs = await validateForm();

        if (
            errs.currentPassword === '' &&
            errs.newPassword === '' &&
            errs.confirmNewPassword === ''
        ) {
            try {
                startLoading();
                await fetcher.post(form, api.changePassword);
                await router.push('/');
                triggerAlert({
                    type: 'Success',
                    message: 'Su contraseña fue actualizada correctamente',
                });
                stopLoading();
            } catch (error) {
                triggerAlert({
                    type: 'Failure',
                    message: 'Ocurrió un error al intentar actualizar su contraseña',
                });
                stopLoading();
            }
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        void submit(e);
    };

    const handleNavigate = (): void => {
        void goBack();
    };

    return (
        <>
            <form
                className="mx-auto my-4 flex w-1/2 flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4"
                onSubmit={handleSubmit}
            >
                <h2 className="text-lg">Ajustes</h2>
                <hr />
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="currentPassword"
                            value="Contraseña actual"
                            className="text-lg"
                        />
                    </div>
                    <TextInput
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        sizing="md"
                        onChange={handleChange}
                        placeholder=""
                        value={form.currentPassword}
                        color={errors.currentPassword !== '' ? 'failure' : ''}
                    />
                    <div className="mb-2 block">
                        <Label
                            htmlFor="name error"
                            value={errors.currentPassword}
                            className="text-lg"
                            color="failure"
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="newPassword"
                            value="Nueva contraseña"
                            className="text-lg"
                        />
                    </div>
                    <TextInput
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        sizing="md"
                        onChange={handleChange}
                        placeholder=""
                        value={form.newPassword}
                        color={errors.newPassword !== '' ? 'failure' : ''}
                    />
                    <div className="mb-2 block">
                        <Label
                            htmlFor="name error"
                            value={errors.newPassword}
                            className="text-lg"
                            color="failure"
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="confirmNewPassword"
                            value="Confirmar nueva contraseña"
                            className="text-lg"
                        />
                    </div>
                    <TextInput
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        type="password"
                        onChange={handleChange}
                        sizing="md"
                        placeholder=""
                        value={form.confirmNewPassword}
                        color={errors.confirmNewPassword !== '' ? 'failure' : ''}
                    />
                    <div className="mb-2 block">
                        <Label
                            htmlFor="name error"
                            value={errors.confirmNewPassword}
                            className="text-lg"
                            color="failure"
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    <Button size="sm" color="gray" onClick={handleNavigate}>
                        {' '}
                        Cancelar
                    </Button>
                    <Button size="sm" type="submit">
                        Guardar
                    </Button>
                </div>
            </form>
        </>
    );
}
