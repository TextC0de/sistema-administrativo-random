import { Button, Label, Select, TextInput } from 'flowbite-react';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import { IBusiness, ICity, IClient} from 'backend/models/interfaces';
import fetcher from 'lib/fetcher';
import * as api from 'lib/apiEndpoints'
import useLoading from 'frontend/hooks/useLoading';
import { BsFillXCircleFill } from 'react-icons/bs';

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
    businesses:string
}

interface props{
    branchForm:IClientBranchForm,
    newBranch?:boolean,
    cities:ICity[]
    businesses:IBusiness[]
}

export default function ClientBranchForm({branchForm, newBranch=true, cities, businesses}:props){
    const router = useRouter()
    const {stopLoading, startLoading} = useLoading()
    const [form, setForm] = useState<IClientBranchForm>({
        _id:branchForm._id,
        number: branchForm.number,
        client: branchForm.client,
        city: branchForm.city,
        businesses: branchForm.businesses,
    })
    const[errors, setErrors] = useState<IClientBranchFormErrors>({} as IClientBranchFormErrors)
    const [submitted, setSubmitted] = useState<boolean>(false)

    const postData = async (form:IClientBranchForm) => {
        try {
            startLoading()
            await fetcher.post(form, api.techAdmin.branches)
            await router.push(`/tech-admin/clients/${form.client.name}/branches`)
            stopLoading()
        } 
        catch (error) {
            console.log(error)
            stopLoading()
            alert('No se pudo crear la sucursal')
        }
    }

    const putData = async (form:IClientBranchForm) => {      
        try {
            startLoading()
            await fetcher.put(form, api.techAdmin.branches)
            await router.push(`/tech-admin/clients/${form.client.name}/branches`)
            stopLoading()
        } 
        catch (error) {
            console.log(error)
            stopLoading()
            alert('No se pudo actualizar la sucursal')
        }
    }

    function selectCity(e:ChangeEvent<HTMLSelectElement>){
        const {value} = e.target
        const cityName = value.slice(0, value.indexOf(','))
        const city = cities.find(city => city.name === cityName)
        if(city)setForm({...form, city})
    }

    function handleChange(e:ChangeEvent<HTMLInputElement>){
        const{value} = e.target
        setForm({...form, number:parseInt(value)})        
    }

    useEffect(()=>{
        if(submitted) formValidate()
    }, [form])

    const formValidate = () => {
        let err : IClientBranchFormErrors = {
            number:'',
            city:'',
            businesses:''
        }
        if (!form.number) err.number = 'Se debe proporcionar un numero'
        if (Object.keys(form.city).length < 1) err.city = 'Se debe especificar la ciudad'
        if (form.businesses.length < 1) err.businesses = 'Se debe seleccionar al menos una empresa'
        setErrors(err)
        return err
    }

    const handleSubmit = (e:any) => {
        e.preventDefault()
        setSubmitted(true)
        const errors = formValidate()
        if (errors.number === '' && errors.city === '') {
            newBranch ? postData(form) : putData(form)
        }
    }

    const addBusiness = (e:any) => {
        const {value} = e.target
        const business = businesses.find(business => business.name === value)
        if(business)setForm(prev=>{return {...prev, businesses: !prev.businesses.some(x => x._id === business._id)? [...prev.businesses, business] : prev.businesses}})
    }

    const deleteBranchBusiness = (id:string) =>{
        setForm(prev=>{return {...prev, businesses:prev.businesses.filter(business => business._id!=id)}})
    }

    async function goBack(){
        startLoading()
        await router.push(`/tech-admin/clients/${form.client.name}/branches`)
        stopLoading()
    }

    return(
        <>
            <form className='flex flex-col gap-4 bg-white rounded-xl border border-gray-150 p-4 mx-auto w-1/2 my-4' onSubmit={handleSubmit}>
                <h2 className='text-lg'>
                    {`${branchForm.client.name} : ${newBranch? `Agregar una sucursal`:`Editar la sucursal  ${branchForm.number}`}`}
                </h2>
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
                    disabled={newBranch?false:true}
                    color={errors.number?'failure':''}
                    />
                    <div className='mb-2 block'>
                        <Label
                        htmlFor='number error'
                        value={errors.number}
                        className='text-lg'
                        color='failure'
                        />
                    </div>
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
                        disabled={newBranch?false:true}
                        color={errors.city?'failure':''}
                    >
                        <option value="default" disabled hidden>{newBranch? 'Seleccione una localidad...':`${form.city.name}, ${form.city.province.name}`}</option>
                        {cities.map((city, index)=> <option key={index}>{`${city.name}, ${city.province.name} `}</option>)}
                    </Select>
                    <div className='mb-2 block'>
                        <Label
                        htmlFor='city error'
                        value={errors.city}
                        className='text-lg'
                        color='failure'
                        />
                    </div>
                </div>
                <hr className='mt-1'/>
                <Label value='Empresas contratadas' className='text-lg'/>
                <div>
                    <Select
                        id='branchBusinesses'
                        onChange={addBusiness}
                        value='default'
                        className='col-span-5'
                        color={errors.businesses?'failure':''}
                    >
                        <option value="default" disabled hidden>Seleccione las empresas a agregar</option>
                        {businesses.map((business, index) =><option key={index} value={business.name}>{business.name}</option>)}
                    </Select>
                    <ul>
                        {form.businesses.map((business, index) =>{
                            return(
                                <li className='rounded-full bg-gray-300 py-2 px-3 mr-1 mb-2 inline-block' key={index}>
                                    <div className='flex justify-between items-center gap-2 font-semibold'>
                                        {business.name}
                                        <button className='rounded-full bg-white ' onClick={()=>deleteBranchBusiness(business._id as string)}>
                                                <BsFillXCircleFill color='gray' size={20} />
                                            </button>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    <div className='mb-2 block'>
                        <Label
                        htmlFor='business error'
                        value={errors.businesses}
                        className='text-lg'
                        color='failure'
                        />
                    </div>
                </div>
                <div className='flex flex-row justify-between'>
                    <Button size='sm' color='gray' onClick={goBack}> Cancelar</Button>
                    <Button size='sm' type='submit'>Guardar</Button>
                </div>
            </form>
        </>
    )
}