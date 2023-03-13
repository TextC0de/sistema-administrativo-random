import { Button, Label, TextInput } from 'flowbite-react';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import fetcher from 'lib/fetcher';
import * as api from 'lib/apiEndpoints'
import useLoading from 'frontend/hooks/useLoading';
import useAlert from 'frontend/hooks/useAlert';

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
    const {triggerAlert} = useAlert()
    const [submitted, setSubmitted] = useState<boolean>(false)
    const[errors, setErrors] = useState<IBusinessFormErrors>({} as IBusinessFormErrors)

    const postData = async (form:IBusinessForm) => {
        try {
            startLoading()
            await fetcher.post(form, api.techAdmin.businesses)
            await router.push('/tech-admin/businesses')
            triggerAlert({type:'Success', message:`Se creo la empresa "${form.name}" correctamente`})
            stopLoading()
        } 
        catch (error) {
            console.log(error)
            stopLoading()
            triggerAlert({type:'Failure', message:`No se pudo crear la empresa "${form.name}"`})
        }
    }

    const putData = async (form:IBusinessForm) => {
        try {
            startLoading()
            await fetcher.put(form, api.techAdmin.businesses)
            await router.push('/tech-admin/businesses')
            triggerAlert({type:'Success', message:`Se actualizo la empresa "${form.name}" correctamente`})
            stopLoading()
        } 
        catch (error) {
            console.log(error)
            triggerAlert({type:'Failure', message:`No se pudo actualizar la empresa "${form.name}"`})
            stopLoading()
        }
    }

    function handleChange(e:ChangeEvent<HTMLInputElement>){
        const{value} = e.target

        setForm({...businessForm, name:value})
        //console.log(form);
        
    }

    useEffect(()=>{
        if(submitted) formValidate()
    }, [form])

    const formValidate = () => {
        let err : IBusinessFormErrors = { 
           name:''
        }
        if (!form.name) err.name = 'Se debe especificar un nombre'
        setErrors(err)
        return err
    }

    async function goBack(){
        startLoading()
        await router.push('/tech-admin/businesses')
        stopLoading()
    }
    const handleSubmit = (e:any) => {
        setSubmitted(true)
        e.preventDefault()
        const errs = formValidate()
        if (errs.name === '' ) {
            newBusiness ? postData(form) : putData(form)
        }
    }    
    return(
        <>
            <form className='flex flex-col gap-4 w-1/2 mx-auto pt-4 bg-gray-50 rounded-3xl p-4 my-4' onSubmit={handleSubmit}>
                <h2 className="text-lg">{newBusiness?'Agregar Empresa':'Editar Empresa'}</h2>
                <hr className="mb-2"/>
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
                    color={errors.name?'failure':''}
                    placeholder={businessForm.name}
                    onChange={handleChange}
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
                <div className='flex flex-row justify-between'>
                    <Button size='sm' color='gray' onClick={goBack}> Cancelar </Button>
                    <Button size='sm' onClick={handleSubmit}> Guardar </Button>
                </div>
            </form>
        </>
    )
}