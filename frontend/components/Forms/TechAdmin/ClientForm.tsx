import { Button, Label, TextInput } from 'flowbite-react';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import * as apiEndpoints from 'lib/apiEndpoints'
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
    const contentType = 'application/json'
    const [form,setForm] = useState<IClientForm>({
        _id:clientForm._id,
        name:clientForm.name
    })
    const[errs, setErrs] = useState<IClientFormErrors>()

    const postData = async (form:IClientForm) => {
        
        
        try {
            const res: Response = await fetch(apiEndpoints.techAdmin.clients, {
                method: 'POST',
                headers: {
                Accept: contentType,
                'Content-Type': contentType,
                },
                body: JSON.stringify(form),
            })

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                console.log(res);
                throw new Error('failed to create client')
            }
            router.push('/tech-admin/clients')
        } 
        catch (error) {
            console.log(error)

        }
    }

    const putData = async (form:IClientForm) => {
        const { id } = router.query
        try {
            const res: Response = await fetch(apiEndpoints.techAdmin.clients + id, {
                method: 'PUT',
                headers: {
                Accept: contentType,
                'Content-Type': contentType,
                },
                body: JSON.stringify(form),
            })

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                console.log(res);
                throw new Error('failed to update client')
                
            }
            router.push('/tech-admin/clients')
        } 
        catch (error) {
            console.log(error)

        }
    }

    function handleChange(e:ChangeEvent<HTMLInputElement>){
        const{value} = e.target

        setForm({...clientForm, name:value})
        //console.log(form);
        
    }

    const formValidate = () => {
        let err : IClientFormErrors = { 
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
            newClient ? postData(form) : putData(form)
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
                <Button size='sm' onClick={handleSubmit}> Guardar </Button>
            </form>
            <ul>
                {errs && Object.values(errs).map((err, index)=><li key={index}>{err}</li>)}
            </ul>
        </>
    )
}