import { type IProvince, type ICity } from 'backend/models/interfaces'
import { type Role, roles } from 'backend/models/types'
import { Label, TextInput, Select, Button, Checkbox } from 'flowbite-react'
import { useRouter } from 'next/router'
import { useState, type ChangeEvent, useEffect, type FormEvent } from 'react'
import fetcher from 'lib/fetcher'
import * as api from 'lib/apiEndpoints'
import useLoading from 'frontend/hooks/useLoading'
import useAlert from 'frontend/hooks/useAlert'

export interface IUserForm {
    _id: string
    firstName: string
    lastName: string
    city: ICity
    roles: Role[]
    email: string
    password: string
}

interface IUserFormErrors {
    firstName: string
    lastName: string
    roles: string
    email: string
}

interface props {
    userForm: IUserForm
    cities: ICity[]
    newUser: boolean
}

export default function UserForm({ userForm, newUser = true, cities }: props): JSX.Element {
    const router = useRouter()
    const [form, setForm] = useState<IUserForm>({
        _id: userForm._id,
        firstName: userForm.firstName,
        lastName: userForm.lastName,
        city: userForm.city,
        roles: userForm.roles,
        email: userForm.email,
        password: ''
    })
    const [errors, setErrors] = useState<IUserFormErrors>({} as IUserFormErrors)
    const [submitted, setSubmitted] = useState<boolean>(false)
    const { stopLoading, startLoading } = useLoading()
    const { triggerAlert } = useAlert()
    const postData = async (form: IUserForm): Promise<void> => {
        try {
            startLoading()
            await fetcher.post(form, api.techAdmin.users)
            await router.push('/tech-admin/users')
            stopLoading()
            triggerAlert({ type: 'Success', message: `El usuario ${form.firstName} ${form.lastName} fue creado correctamente` })
        } catch (error) {
            console.log(error)
            stopLoading()
            triggerAlert({ type: 'Failure', message: `No se pudo crear el usuario ${form.firstName} ${form.lastName}` })
        }
    }

    const putData = async (form: IUserForm): Promise<void> => {
        try {
            startLoading()
            await fetcher.put(form, api.techAdmin.users)
            await router.push('/tech-admin/users')
            stopLoading()
            triggerAlert({ type: 'Success', message: `El usuario ${form.firstName} ${form.lastName} fue actualizado correctamente` })
        } catch (error) {
            console.log(error)
            stopLoading()
            triggerAlert({ type: 'Failure', message: `No se pudo actualizar el usuario ${form.firstName} ${form.lastName}` })
        }
    }

    function selectCity(e: ChangeEvent<HTMLSelectElement>): void {
        const { value } = e.target
        const city = cities.filter(city => city.name === value.slice(0, value.indexOf(',')))
        setForm({ ...form, city: city[0] })
    }

    function checkboxChange(e: ChangeEvent<HTMLInputElement>): void {
        const { id } = e.target

        if (form.roles.includes(id as Role)) {
            const newForm = form
            newForm.roles = form.roles.filter(role => role !== id)
            setForm(newForm)
        } else {
            const newForm = form
            newForm.roles.push(id as Role)
            setForm(newForm)
        }
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        const { value, name } = e.target
        setForm({ ...form, [name]: value })
    }

    const formValidate = (): IUserFormErrors => {
        const err: IUserFormErrors = {
           firstName: '',
           lastName: '',
           email: '',
           roles: ''
        }
        if (form.firstName === '') err.firstName = 'El nombre es requerido'
        if (form.lastName === '') err.lastName = 'El apellido es requerido'
        if (form.email === '') err.email = 'La direccion de email es requerida'
        if (form.roles.length < 1) err.roles = 'Se le debe asignar al menos un rol al usuario'
        setErrors(err)
        return err
    }

    useEffect(() => {
        if (submitted) formValidate()
    }, [form])

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        setSubmitted(true)
        e.preventDefault()
        const errors = formValidate()

        if (errors.firstName === '' && errors.lastName === '' && errors.email === '' && errors.roles === '') {
            // setForm({...form, password:'webada2020'})
            if (newUser) void postData(form)
            else void putData(form)
        }
    }

    async function goBack(): Promise<void> {
        startLoading()
        await router.push('/tech-admin/users')
        stopLoading()
    }

    const handleNavigate = (): void => {
        void goBack()
    }

    return (
        <>
            <form className='flex flex-col gap-4 bg-gray-50 rounded-3xl p-4 mx-auto w-1/2 mt-4' onSubmit={handleSubmit}>
                <h2 className="text-lg">{newUser ? 'Crear usuario' : 'Editar usuario'}</h2>
                <hr className="mb-2"/>
                <div>
                    <div className='mb-2 block'>
                        <Label
                            htmlFor='firstName'
                            value='Nombre del usuario'
                            className='text-lg'
                        />
                    </div>
                    <TextInput
                    id='firstName'
                    name='firstName'
                    type='text'
                    sizing='md'
                    placeholder={userForm.firstName}
                    onChange={handleChange}
                    value={form.firstName}
                    color={errors.firstName !== '' ? 'failure' : ''}

                    />
                    <div className='mb-2 block'>
                        <Label
                        htmlFor='name error'
                        value={errors.firstName}
                        className='text-lg'
                        color='failure'
                        />
                    </div>
                </div>
                <div>
                    <div className='mb-2 block'>
                        <Label
                            htmlFor='lastName'
                            value='Apellido del usuario'
                            className='text-lg'
                        />
                    </div>
                    <TextInput
                    id='lastName'
                    name='lastName'
                    type='text'
                    sizing='md'
                    placeholder={userForm.lastName}
                    onChange={handleChange}
                    value={form.lastName}
                    color={errors.lastName !== '' ? 'failure' : ''}
                    />
                    <div className='mb-2 block'>
                        <Label
                        htmlFor='name error'
                        value={errors.lastName}
                        className='text-lg'
                        color='failure'
                        />
                    </div>
                </div>
                <div>
                    <div className='mb-2 block'>
                        <Label
                            htmlFor='email'
                            value='Email del usuario'
                            className='text-lg'
                        />
                    </div>
                    <TextInput
                    id='email'
                    name='email'
                    type='email'
                    sizing='md'
                    placeholder={userForm.email}
                    onChange={handleChange}
                    value={form.email}
                    color={errors.email !== '' ? 'failure' : ''}
                    />
                    <div className='mb-2 block'>
                        <Label
                        htmlFor='email error'
                        value={errors.email}
                        className='text-lg'
                        color='failure'
                        />
                    </div>
                </div>
                <div className='mb-2 block'>
                        <Label
                            value='Roles del usuario'
                            className='text-lg'
                        />
                    </div>
                <div
                    className="flex flex-col gap-4"
                    id="checkbox"
                    >
                    {roles.map((role, index) => <div key={index} className="flex items-center gap-2">
                        <Checkbox
                        id={`${role}`}
                        defaultChecked={userForm.roles.includes(role)}
                        onChange={checkboxChange}
                        color={errors.roles !== '' ? 'failure' : ''}
                        />
                        <Label htmlFor={role}>
                            {role}
                        </Label>
                    </div>)}
                    <div className='mb-2 block'>
                        <Label
                        htmlFor='roles error'
                        value={errors.roles}
                        className='text-lg'
                        color='failure'
                        />
                    </div>
                </div>
                <div id='select-city'>
                    <div className='mb-2 block'>
                        <Label
                        htmlFor='city'
                        value='En que ciudad reside el usuario?'
                        className='text-lg'
                        />
                    </div>
                    <Select
                        id='cities'
                        onChange={selectCity}
                        name='city'
                        defaultValue='default'
                    >
                        <option value='default' disabled hidden>{newUser ? 'Seleccione una ciudad' : userForm.city !== undefined && `${userForm.city.name}, ${(userForm.city.province as IProvince).name}`}</option>
                        {cities.map((city, index) => <option key={index}>{`${city.name}, ${(city.province as IProvince).name}`}</option>)}
                    </Select>
                </div>
                <div className="flex flex-row justify-between">
                    <Button size='sm' onClick={handleNavigate} type='button' color='gray'> Cancelar </Button>
                    <Button size='sm' type='submit'> Guardar </Button>
                </div>
            </form>
        </>
    )
}
