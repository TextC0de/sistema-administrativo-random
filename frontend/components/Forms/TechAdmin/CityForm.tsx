import { Button, Label, Select, TextInput } from 'flowbite-react';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import { IProvince } from 'backend/models/interfaces';
import fetcher from 'lib/fetcher';
import * as api from 'lib/apiEndpoints'
import useLoading from 'frontend/hooks/useLoading';
import useAlert from 'frontend/hooks/useAlert';
export interface ICityForm{
    _id:string
    name:string
    province:IProvince
}

export interface ICityFormErrors{
    name:string
    province:string
}

interface props{
    cityForm:ICityForm,
    newCity?:boolean
    provinces:IProvince[]
}

export default function cityForm({cityForm, newCity=true, provinces}:props){
    const router = useRouter()
    const {stopLoading, startLoading} = useLoading()
    const [form, setForm] = useState<ICityForm>({
        _id:cityForm._id,
        name:cityForm.name,
        province: cityForm.province
    })
    const[errors, setErrors] = useState<ICityFormErrors>({} as ICityFormErrors)
    const {triggerAlert} = useAlert()

    const postData = async (form:ICityForm) => {
        try {
            startLoading()
            await fetcher.post(form, api.techAdmin.cities)
            await router.push('/tech-admin/cities')
            triggerAlert({type:'Success', message:'La localidad fue creada correctamente'})
            stopLoading()
        } 
        catch (error) {
            console.log(error)
            stopLoading()
            triggerAlert({type:'Failure', message:'No se pudo crear la localidad'})
        }
    }

    const putData = async (form:ICityForm) => {
        try {
            startLoading()
            await fetcher.put(form, api.techAdmin.cities)
            await router.push('/tech-admin/cities')
            triggerAlert({type:'Success', message:'La localidad fue actualizada correctamente'})
            stopLoading()
        } 
        catch (error) {
            console.log(error)
            stopLoading()
            triggerAlert({type:'Failure', message:'No se pudo actualizar la localidad'})
        }
    }

    function selectProvince(e:ChangeEvent<HTMLSelectElement>){
        const {value} = e.target
        const province = provinces.find(province => province.name === value)
        if(province)setForm({...form, province})

    }

    function handleChange(e:ChangeEvent<HTMLInputElement>){
        const{value} = e.target
        setForm({...form, name:value})        
    }

    async function goBack(){
        startLoading()
        await router.push('/tech-admin/cities')
        stopLoading()
    }

    const formValidate = () => {
        let err : ICityFormErrors = { 
           name:'',
           province:''
        }
        if (!form.name) err.name = 'Se debe especificar un nombre'
        if (Object.keys(form.province).length < 1) err.province = 'Se debe especificar la provincia'
        
        return err
    }

    const handleSubmit = (e:any) => {
        e.preventDefault()
        const errors = formValidate()
        
        if (errors.name === '' ) {
            newCity ? postData(form) : putData(form)
        } else {
            setErrors(errors)
        }
    }

    return(
        <>
            <form className='flex flex-col gap-4 w-1/2 p-4 rounded-3xl mx-auto my-4 bg-gray-50' onSubmit={handleSubmit}>
                <h2 className="text-lg">{newCity?'Agregar Localidad':'Editar Localidad'}</h2>
                <hr className="mb-2"/>
                <div>
                    <div className='mb-2 block'>
                        <Label
                            htmlFor='name'
                            value='Nombre de la ciudad'
                            className='text-lg'
                        />
                    </div>
                    <TextInput
                    id='name'
                    type='text'
                    sizing='md'
                    placeholder={cityForm.name}
                    onChange={handleChange}
                    value={form.name}
                    color={errors.name?'failure':''}
                    />
                    <div className='mb-2 block'>
                        <Label
                        htmlFor='name error'
                        value={errors.name}
                        className='text-lg'
                        color='failure'
                        />
                    </div>
                </div>
                <div id='select-province'>
                    <div className='mb-2 block'>
                        <Label
                        htmlFor='province'
                        value='Elegi la provincia'
                        className='text-lg'
                        />
                    </div>
                    <Select
                        id='provinces'
                        required={true}
                        onChange={selectProvince}
                        name='province'
                        defaultValue='default'
                        color={errors.province?'failure':''}
                    >
                        <option value='default' disabled hidden>{newCity?'Seleccione una provincia':cityForm.province.name}</option>
                        {provinces.map((province, index)=> <option key={index}>{province.name}</option>)}
                    </Select>
                    <div className='mb-2 block'>
                        <Label
                        htmlFor='province error'
                        value={errors.province}
                        className='text-lg'
                        color='failure'
                        />
                    </div>
                </div>
                <div className='flex flex-row justify-between'>
                    <Button size='sm' onClick={goBack} color='gray'> Cancelar </Button>
                    <Button size='sm' onClick={handleSubmit}> Guardar </Button>
                </div>
            </form>
        </>
    )
}