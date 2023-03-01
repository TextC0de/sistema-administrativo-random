import { IUser, ICity } from "backend/models/interfaces";
import { Role, roles } from "backend/models/types";
import { Label, TextInput, Select, Button, Checkbox } from "flowbite-react";
import { useRouter } from "next/router";
import { useState, ChangeEvent } from "react";
import fetcher from 'lib/fetcher';
import * as api from 'lib/apiEndpoints'
import useLoading from "frontend/hooks/useLoading";

export interface IUserForm{
    _id:string,
    firstName:string,
    lastName:string,
    city:ICity,
    roles:Role[],
    email:string,
    password:string,
}

interface IUserFormErrors{
    firstName:string,
    lastName:string,
    roles:string
    email:string
}

interface props{
    userForm:IUserForm,
    cities:ICity[],
    newUser:boolean
}

export default function UserForm({userForm, newUser=true, cities}:props){
    const router = useRouter()
    const contentType = 'application/json'
    const [form, setForm] = useState<IUserForm>({
        _id:userForm._id,
        firstName:userForm.firstName,
        lastName:userForm.lastName,
        city: userForm.city,
        roles:userForm.roles,
        email:userForm.email,
        password:''
    })
    const[errs, setErrs] = useState<IUserFormErrors>()

    const {stopLoading, startLoading} = useLoading()

    const postData = async (form:IUserForm) => {
        try {
            startLoading()
            await fetcher.post(form, api.techAdmin.users)
            await router.push('/tech-admin/users')
            stopLoading()
        } 
        catch (error) {
            console.log(error)
            stopLoading()
            alert('No se pudo crear el usuario')
        }
    }

    const putData = async (form:IUserForm) => {
        try {
            startLoading()
            await fetcher.put(form, api.techAdmin.users)
            await router.push('/tech-admin/users')
            stopLoading()
        } 
        catch (error) {
            console.log(error)
            stopLoading()
            alert('No se pudo actualizar el usuario')
        }
    }

    function selectCity(e:ChangeEvent<HTMLSelectElement>){
        const {value} = e.target
        const city = cities.filter(city => city.name === value.slice(0, value.indexOf(',')))
        setForm({...form, city:city[0]})

    }

    function checkboxChange(e:ChangeEvent<HTMLInputElement>){
        const {id} = e.target
        
        if(form.roles.includes(id as Role)){
            
            const newForm = form
            newForm.roles = form.roles.filter(role => role!=id)            
            setForm(newForm)
        }
        else{
            const newForm = form
            newForm.roles.push(id as Role)
            setForm(newForm)   
        }
        
        
    }

    function handleChange(e:ChangeEvent<HTMLInputElement>){
        const{value, name} = e.target
        setForm({...form, [name]:value})        
    }

    const formValidate = () => {
        let err : IUserFormErrors = { 
           firstName:'',
           lastName:'',
           email:'',
           roles:''
        }
        if (!form.firstName) err.firstName = 'firstName is required'
        if (!form.lastName) err.lastName = 'lastName is required'
        if (!form.email) err.email = 'email is required'
        if (!form.roles) err.roles = 'roles are required'
        
        return err
    }

    const handleSubmit = (e:any) => {
        e.preventDefault()
        const errs = formValidate()
        
        if (errs.firstName === '' && errs.lastName === '' && errs.email === '' && errs.roles === '') {
            setForm({...form, password:'webada2020'})
            newUser ? postData(form) : putData(form)
        } else {
            setErrs(errs)
        }
    }

    return(
        <>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
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
                    />
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
                    />
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
                    />
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
                    {roles.map((role, index)=> <div key={index} className="flex items-center gap-2">
                        <Checkbox
                        id={`${role}`}
                        defaultChecked={userForm.roles.includes(role)}
                        onChange={checkboxChange}
                        />
                        <Label htmlFor={`${role}`}>
                            {role}
                        </Label>
                    </div>)}
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
                        <option value='default' disabled hidden>{newUser?'Seleccione una ciudad': userForm.city && `${userForm.city.name}, ${userForm.city.province.name}`}</option>
                        {cities.map((city, index)=> <option key={index}>{`${city.name}, ${city.province.name}`}</option>)}
                    </Select>
                </div>
                <Button size='sm' onClick={handleSubmit}> Guardar </Button>
            </form>
            <ul>
                {errs && Object.values(errs).map((err, index)=><li key={index}>{err}</li>)}
            </ul>
        </>
    )
}