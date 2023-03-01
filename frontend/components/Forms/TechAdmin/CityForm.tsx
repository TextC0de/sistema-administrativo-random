import { Button, Label, Select, TextInput } from 'flowbite-react';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import { IProvince } from 'backend/models/interfaces';
import fetcher from 'lib/fetcher';
import * as api from 'lib/apiEndpoints'
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

    const [form, setForm] = useState<ICityForm>({
        _id:cityForm._id,
        name:cityForm.name,
        province: newCity? provinces[0] : cityForm.province
    })
    const[errs, setErrs] = useState<ICityFormErrors>()

    const postData = async (form:ICityForm) => {
        try {
            await fetcher.post(form, api.techAdmin.cities)
            router.push('/tech-admin/cities')
        } 
        catch (error) {
            console.log(error)
            alert('No se pudo crear la ciudad')
        }
    }

    const putData = async (form:ICityForm) => {
        try {
            await fetcher.put(form, api.techAdmin.cities)
            router.push('/tech-admin/cities')
        } 
        catch (error) {
            console.log(error)
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
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
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
                <Button size='sm' onClick={handleSubmit}> Guardar </Button>
            </form>
            <ul>
                {errs && Object.values(errs).map((err, index)=><li key={index}>{err}</li>)}
            </ul>
        </>
    )
}