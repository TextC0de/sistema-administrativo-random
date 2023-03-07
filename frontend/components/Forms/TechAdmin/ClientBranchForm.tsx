import { Button, Label, Select, TextInput } from 'flowbite-react';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
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
    const[errs, setErrs] = useState<IClientBranchFormErrors>()

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
            <form className='flex flex-col gap-4 my-4 w-1/2 mx-auto bg-gray-50  p-4 rounded-3xl' onSubmit={handleSubmit}>
                <h2 className='text-lg'>{`${newBranch? `Agregar una sucursal para `:`Editar la sucursal  ${branchForm.number} de`} ${branchForm.client.name}`}</h2>
                <hr />
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
                        disabled={newBranch?false:true}
                        
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
                </div>
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
                <div className='flex flex-row justify-between'>
                    <Button size='sm' color='gray' onClick={goBack}> Cancelar</Button>
                    <Button size='sm' type='submit'>Guardar</Button>
                </div>
            </form>
            <ul>
                {errs && Object.values(errs).map((err, index)=><li key={index}>{err}</li>)}
            </ul>
        </>
    )
}