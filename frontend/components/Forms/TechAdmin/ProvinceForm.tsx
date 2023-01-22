import { Button, Label, TextInput } from 'flowbite-react';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import * as apiEndpoints from 'lib/apiEndpoints'
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
    const contentType = 'application/json'
    const [form,setForm] = useState<IProvinceForm>({
        _id:provinceForm._id,
        name:provinceForm.name
    })
    const[errs, setErrs] = useState<IProvinceFormErrors>()

    const postData = async (form:IProvinceForm) => {
        
        
        try {
            const res: Response = await fetch(apiEndpoints.techAdmin.provinces, {
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
                throw new Error('failed to create province')
            }
            router.push('/tech-admin/provinces')
        } 
        catch (error) {
            console.log(error)

        }
    }

    const putData = async (form:IProvinceForm) => {
        try {
            const res: Response = await fetch(apiEndpoints.techAdmin.provinces, {
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
                throw new Error('failed to update province')
                
            }
            router.push('/tech-admin/provinces')
        } 
        catch (error) {
            console.log(error)

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