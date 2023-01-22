import { Button, Label, Select, TextInput } from 'flowbite-react';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import * as apiEndpoints from 'lib/apiEndpoints'
import { IProvince } from 'backend/models/interfaces';
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
    const contentType = 'application/json'
    const [form, setForm] = useState<ICityForm>({
        _id:cityForm._id,
        name:cityForm.name,
        province: newCity? provinces[0] : cityForm.province
    })
    const[errs, setErrs] = useState<ICityFormErrors>()

    const postData = async (form:ICityForm) => {
        try {
            const res: Response = await fetch(apiEndpoints.techAdmin.cities, {
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
                throw new Error('failed to create city')
            }
            router.push('/tech-admin/cities')
        } 
        catch (error) {
            console.log(error)

        }
    }

    const putData = async (form:ICityForm) => {
        const { id } = router.query
        try {
            const res: Response = await fetch(apiEndpoints.techAdmin.cities, {
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
                throw new Error('failed to update city')
                
            }
            router.push('/tech-admin/cities')
        } 
        catch (error) {
            console.log(error)

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