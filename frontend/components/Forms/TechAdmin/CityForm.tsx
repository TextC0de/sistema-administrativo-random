import { Button, Label, Select, TextInput } from 'flowbite-react';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import { IProvince } from 'backend/models/interfaces';
import fetcher from 'lib/fetcher';
import * as api from 'lib/apiEndpoints'
import useLoading from 'frontend/hooks/useLoading';
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
        province: newCity? provinces[0] : cityForm.province
    })
    const[errs, setErrs] = useState<ICityFormErrors>()

    const postData = async (form:ICityForm) => {
        try {
            startLoading()
            await fetcher.post(form, api.techAdmin.cities)
            await router.push('/tech-admin/cities')
            stopLoading()
        } 
        catch (error) {
            console.log(error)
            stopLoading()
            alert('No se pudo crear la ciudad')
        }
    }

    const putData = async (form:ICityForm) => {
        try {
            startLoading()
            await fetcher.put(form, api.techAdmin.cities)
            await router.push('/tech-admin/cities')
            stopLoading()
        } 
        catch (error) {
            console.log(error)
            stopLoading()
            alert('No se pudo actualizar la ciudad')
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
        if (!form.name) err.name = 'name is required'
        if (!form.province) err.province = 'province is required'
        
        return err
    }

    const handleSubmit = (e:any) => {
        e.preventDefault()
        const errs = formValidate()
        
        if (errs.name === '' ) {
            newCity ? postData(form) : putData(form)
        } else {
            setErrs(errs)
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
                    />
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
                    >
                        <option value='default' disabled hidden>{newCity?'Seleccione una provincia':cityForm.province.name}</option>
                        {provinces.map((province, index)=> <option key={index}>{province.name}</option>)}
                    </Select>
                </div>
                <div className='flex flex-row justify-between'>
                    <Button size='sm' onClick={goBack} color='gray'> Cancelar </Button>
                    <Button size='sm' onClick={handleSubmit}> Guardar </Button>
                </div>
            </form>
            <ul>
                {errs && Object.values(errs).map((err, index)=><li key={index}>{err}</li>)}
            </ul>
        </>
    )
}