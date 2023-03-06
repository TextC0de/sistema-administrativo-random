import { Button, Label, TextInput } from 'flowbite-react';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import fetcher from 'lib/fetcher';
import * as api from 'lib/apiEndpoints'
import useLoading from 'frontend/hooks/useLoading';
export interface IClientForm{
    _id:string
    name:string
}

export interface IClientFormErrors{
    name:string
}

interface props{
    clientForm:IClientForm,
    newClient?:boolean
}

export default function ClientForm({clientForm, newClient=true }:props){
    const router = useRouter()
    const [form,setForm] = useState<IClientForm>({
        _id:clientForm._id,
        name:clientForm.name
    })
    const[errs, setErrs] = useState<IClientFormErrors>()
    const {stopLoading, startLoading} = useLoading()
    const postData = async (form:IClientForm) => {
        try {
            startLoading()
            await fetcher.post(form, api.techAdmin.clients)
            await router.push('/tech-admin/clients')
            stopLoading()
        } 
        catch (error) {
            console.log(error)
            stopLoading()
            alert('No se pudo crear al cliente')
        }
    }

    const putData = async (form:IClientForm) => {
        try {
            startLoading()
            await fetcher.put(form, api.techAdmin.clients)
            router.push('/tech-admin/clients')
            stopLoading()
        } 
        catch (error) {
            console.log(error)
            stopLoading()
            alert('No se pudo actualizar el cliente')
        }
    }

    function handleChange(e:ChangeEvent<HTMLInputElement>){
        const{value} = e.target
        setForm({...clientForm, name:value})
    }

    const formValidate = () => {
        let err : IClientFormErrors = { 
           name:''
        }
        //console.log(form.name);
        
        if (!form.name) err.name = 'name is required'
        
        return err
    }

    async function goBack(){
        startLoading()
        await router.push('/tech-admin/clients')
        stopLoading()
    }

    const handleSubmit = (e:any) => {
        e.preventDefault()   
        const errs = formValidate()
        if (errs.name === '' ) {
            newClient ? postData(form) : putData(form)
        } else {
            setErrs(errs)
        }
    }

    return(
        <>
            <form className='flex flex-col gap-4 bg-gray-50 w-1/2 rounded-3xl p-4 mx-auto my-4' onSubmit={handleSubmit}>
                <h2 className="text-lg">{newClient?'Agregar Cliente':'Editar Cliente'}</h2>
                <hr className="mb-2"/>
                <div>
                    <div className='mb-2 block'>
                        <Label
                            htmlFor='name'
                            value='Nombre del cliente'
                            className='text-lg'
                        />
                    </div>
                    <TextInput
                    id='name'
                    type='text'
                    sizing='md'
                    placeholder={clientForm.name}
                    onChange={handleChange}
                    />
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