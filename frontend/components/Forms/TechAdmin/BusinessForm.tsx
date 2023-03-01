import { Button, Label, TextInput } from 'flowbite-react';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import fetcher from 'lib/fetcher';
import * as api from 'lib/apiEndpoints'
import useLoading from 'frontend/hooks/useLoading';

export interface IBusinessForm{
    _id:string,
    name:string
}

export interface IBusinessFormErrors{
    name:string
}

interface props{
    businessForm:IBusinessForm,
    newBusiness?:boolean
}

export default function BusinessForm({businessForm, newBusiness=true }:props){
    const router = useRouter()
    const {stopLoading, startLoading} = useLoading()
    const [form,setForm] = useState<IBusinessForm>({
        _id:businessForm._id,
        name:businessForm.name
    })
    const[errs, setErrs] = useState<IBusinessFormErrors>()

    const postData = async (form:IBusinessForm) => {
        try {
            startLoading()
            await fetcher.post(form, api.techAdmin.businesses)
            await router.push('/tech-admin/businesses')
            stopLoading()
        } 
        catch (error) {
            console.log(error)
            stopLoading()
            alert('No se pudo crear la empresa')
        }
    }

    const putData = async (form:IBusinessForm) => {
        try {
            startLoading()
            await fetcher.put(form, api.techAdmin.businesses)
            await router.push('/tech-admin/businesses')
            stopLoading()
        } 
        catch (error) {
            console.log(error)
            stopLoading()
            alert('No se pudo actualizar la empresa')
        }
    }

    function handleChange(e:ChangeEvent<HTMLInputElement>){
        const{value} = e.target

        setForm({...businessForm, name:value})
        //console.log(form);
        
    }

    const formValidate = () => {
        let err : IBusinessFormErrors = { 
           name:''
        }
        //console.log(form.name);
        
        if (!form.name) err.name = 'name is required'
        
        return err
    }

    const handleSubmit = (e:any) => {
        e.preventDefault()
        
        const errs = formValidate()
        
        if (errs.name === '' ) {
            newBusiness ? postData(form) : putData(form)
        } else {
            setErrs(errs)
        }
    }    
    return(
        <>
            <form className='flex flex-col gap-4 w-50' onSubmit={handleSubmit}>
                <div>
                    <div className='mb-2 block'>
                        <Label
                            htmlFor='name'
                            value='Nombre de la empresa'
                            className='text-lg'
                        />
                    </div>
                    <TextInput
                    id='name'
                    type='text'
                    sizing='md'
                    placeholder={businessForm.name}
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