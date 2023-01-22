import { Button, Label, Select, TextInput } from 'flowbite-react';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import * as apiEndpoints from 'lib/apiEndpoints'
import { IBusiness, ICity, IClient, IProvince } from 'backend/models/interfaces';
import { FONT_MANIFEST } from 'next/dist/shared/lib/constants';
import BusinessTable from 'frontend/components/Tables/BusinessTable';
import { BsPlus } from 'react-icons/bs';
import Business from 'backend/models/Business';
import BranchBusinessTable from 'frontend/components/Tables/BusinessTable/BranchBusinessTable';
import Preventive from 'backend/models/Preventive';

export interface IClientBranchForm{
    _id:string
    number:number
    client:IClient
    city:ICity
    businesses:IBusiness[]
}

export interface IClientBranchFormErrors{
    number:string
    city:string
}

interface props{
    branchForm:IClientBranchForm,
    newBranch?:boolean,
    cities:ICity[]
    businesses:IBusiness[]
}

export default function ClientBranchForm({branchForm, newBranch=true, cities, businesses}:props){
    const router = useRouter()
    const contentType = 'application/json'
    const [form, setForm] = useState<IClientBranchForm>({
        _id:branchForm._id,
        number: branchForm.number,
        client: branchForm.client,
        city: /* newBranch? cities[0] : */ branchForm.city,
        businesses: branchForm.businesses,
    })
    const[errs, setErrs] = useState<IClientBranchFormErrors>()

    const postData = async (form:IClientBranchForm) => {
        try {
            const res: Response = await fetch(apiEndpoints.techAdmin.branches, {
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
                throw new Error('failed to create branch')
            }
            router.push(`/tech-admin/clients/${form.client.name}/branches`)
        } 
        catch (error) {
            console.log(error)

        }
    }

    const putData = async (form:IClientBranchForm) => {      
        try {
            const res: Response = await fetch(apiEndpoints.techAdmin.branches, {
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
                throw new Error('failed to update branch')
                
            }
            router.push(`/tech-admin/clients/${form.client.name}/branches`)
        } 
        catch (error) {
            console.log(error)

        }
    }

    function selectCity(e:ChangeEvent<HTMLSelectElement>){
        const {value} = e.target
        const cityName = value.slice(0, value.indexOf(','))
        //console.log(cityName);
        
        const city = cities.find(city => city.name === cityName)
        if(city)setForm({...form, city})

    }

    function handleChange(e:ChangeEvent<HTMLInputElement>){
        const{value} = e.target
        setForm({...form, number:parseInt(value)})        
    }

    const formValidate = () => {
        let err : IClientBranchFormErrors = {
            number:'',
            city:''
        }
        if (!form.number) err.number = 'number is required'
        if (!form.city) err.city = 'city is required'
        
        return err
    }

    const handleSubmit = (e:any) => {
        e.preventDefault()
        const errs = formValidate()
        
        if (errs.number === '' && errs.city === '') {
            newBranch ? postData(form) : putData(form)
        } else {
            setErrs(errs)
        }
    }
/* 
    const selectBusiness = (e:any)=>{
        const {value} = e.target
        const business = businesses.filter(business => business.name === value)

        
    } */

    const addBusiness = (e:any) => {
        const {value} = e.target
        const business = businesses.find(business => business.name === value)
        if(business)setForm(prev=>{return {...prev, businesses: !prev.businesses.some(x => x._id === business._id)? [...prev.businesses, business] : prev.businesses}})

    }

    const deleteBranchBusiness = (id:string) =>{
        //setBranchBusinesses(prev => prev.filter(business=>business._id!=id))
        setForm(prev=>{return {...prev, businesses:prev.businesses.filter(business => business._id!=id)}})
        
    }


    return(
        <>
            <form className='flex flex-col gap-4 mb-4 w-52' onSubmit={handleSubmit}>
                <h2 className='text-lg'>{`${newBranch? `Agregar una sucursal para `:`Editar la sucursal  ${branchForm.number} de`} ${branchForm.client.name}`}</h2>
                <div>
                    <div className='mb-2 block'>
                        <Label
                            htmlFor='number'
                            value='Numero de la sucursal'
                            className='text-lg'
                        />
                    </div>
                    <TextInput
                    id='number'
                    type='number'
                    sizing='md'
                    placeholder={branchForm.number.toString()}
                    onChange={handleChange}
                    value={form.number}
                    />
                </div>
                <div id='select-city'>
                    <div className='mb-2 block'>
                        <Label
                        htmlFor='city'
                        value='Elegi la ciudad'
                        className='text-lg'
                        />
                    </div>
                    <Select
                        id='citys'
                        required={true}
                        onChange={selectCity}
                        name='city'
                        defaultValue='default'
                        //value={form.city.province?`${form.city.name}, ${form.city.province.name}`:''}
                    >
                        <option value="default" disabled hidden>{newBranch? 'Seleccione una localidad...':`${form.city.name}, ${form.city.province.name}`}</option>
                        {cities.map((city, index)=> <option key={index}>{`${city.name}, ${city.province.name} `}</option>)}
                    </Select>
                </div>
                <Label value='Empresas que trabajan en esta sucursal' className='text-lg'/>
                <Label value='Seleccione del menu desplegable para agregar'/>
                <div className='grid grid-cols-6 gap-4'>
                    <Select
                        id='branchBusinesses'
                        onChange={addBusiness}
                        value='default'
                        className='col-span-5'
                    >
                        <option value="default" disabled hidden>Seleccione una empresa a agregar</option>
                        {businesses.map((business, index) =><option key={index} value={business.name}>{business.name}</option>)}
                    </Select>
                   {/*  <Button onClick={addBusiness} className='col-span-1 gap-2'>
                        <BsPlus size='20'/>
                    </Button> */}
                </div>
                <ul className='rounded bg-teal-400 p-4'>
                    {form.businesses.map((business, index) =>{
                        return(
                            <li key={index}>
                                <div className='flex justify-between items-center'>
                                    {business.name}
                                    <Button onClick={()=>deleteBranchBusiness(business._id as string)} className='cursor-pointer'>
                                        X
                                    </Button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
                {/* <BranchBusinessTable businesses={form.businesses} deleteBusiness={deleteBranchBusiness}/> */}
                <Button size='sm' type='submit'>Guardar </Button>
            </form>
            <ul>
                {errs && Object.values(errs).map((err, index)=><li key={index}>{err}</li>)}
            </ul>
        </>
    )
}