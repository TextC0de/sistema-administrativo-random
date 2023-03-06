import { Button, Label, TextInput } from 'flowbite-react';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import fetcher from 'lib/fetcher';
import * as api from 'lib/apiEndpoints'
import useLoading from 'frontend/hooks/useLoading';
export interface IProvinceForm{
    _id:string,
    name:string
}

export interface IProvinceFormErrors{
    name:string
}

interface props{
    provinceForm:IProvinceForm,
    newProvince?:boolean
}

export default function ProvinceForm({provinceForm, newProvince=true }:props){
    const router = useRouter()
    const [form,setForm] = useState<IProvinceForm>({
        _id:provinceForm._id,
        name:provinceForm.name
    })
    const[errs, setErrs] = useState<IProvinceFormErrors>()
    const {stopLoading, startLoading} = useLoading()
    const postData = async (form:IProvinceForm) => {
        try {
            startLoading()
            await fetcher.post(form, api.techAdmin.provinces)
            router.push('/tech-admin/provinces')
            stopLoading()
        } 
        catch (error) {
            console.log(error)
            stopLoading()
            alert('No se pudo crear la provincia')
        }
    }

    const putData = async (form:IProvinceForm) => {
        try {
            startLoading()
            await fetcher.put(form, api.techAdmin.provinces)
            await router.push('/tech-admin/provinces')
            stopLoading()
        } 
        catch (error) {
            console.log(error)
            stopLoading()
            alert('No se pudo actualizar la provincia')
        }
    }

    function handleChange(e:ChangeEvent<HTMLInputElement>){
        const{value} = e.target

        setForm({...provinceForm, name:value})
        console.log(form);
        
    }

    const formValidate = () => {
        let err : IProvinceFormErrors = { 
           name:''
        }
        //console.log(form.name);
        
        if (!form.name) err.name = 'name is required'
        
        return err
    }

    const handleSubmit = (e:any) => {
        e.preventDefault()
        //console.log('estoy submiteando');
        
        const errs = formValidate()
        
        if (errs.name === '' ) {
            newProvince ? postData(form) : putData(form)
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
                            value='Nombre de la provincia'
                            className='text-lg'
                        />
                    </div>
                    <TextInput
                    id='name'
                    type='text'
                    sizing='md'
                    placeholder={provinceForm.name}
                    onChange={handleChange}
                    />
                </div>
                <Button size='sm' onClick={handleSubmit}> Guardar </Button>
            </form>
            <ul>
                {errs && Object.values(errs).map((err, index)=><li key={index}>{err}</li>)}
            </ul>
        </>
    )
}