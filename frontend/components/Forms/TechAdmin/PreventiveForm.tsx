import { Button, Dropdown, Label, Select, Textarea } from 'flowbite-react';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, MouseEventHandler, useState } from 'react';
import { IBranch, IBusiness, ICity, IClient, IPreventive, IUser } from 'backend/models/interfaces';
import fetcher from 'lib/fetcher';
import * as api from 'lib/apiEndpoints'
import * as types from 'backend/models/types'

import { BsFillXCircleFill } from 'react-icons/bs';
export interface IPreventiveForm{
        _id:string
        branch:IBranch,
        business:IBusiness,
        assigned:IUser[],
        status:types.PreventiveStatus,
        frequency?:types.Frequency,
        months:types.Month[]
        lastDoneAt?:Date,
        batteryChangedAt?:Date,
        observations?:string
}

export interface IPreventiveFormErrors{
    branch:string,
    business:string,
    assigned:string,
}

export interface props{
    preventiveForm:IPreventiveForm,
    newPreventive?:boolean
    branches:IBranch[],
    clients:IClient[],
    businesses:IBusiness[],
    technicians:IUser[],
}

const PreventiveForm = ({preventiveForm, newPreventive = true, businesses, branches, clients, technicians}:props) =>{
    const router = useRouter()
    const [errors, setErrors] = useState({})
    const [message, setMessage] = useState('')
    const [client, setClient] = useState(preventiveForm.branch.client?preventiveForm.branch.client.name:'')
    const [filteredBranches, setFilteredBranches ] = useState<IBranch[]>()
    const [form, setForm] = useState<IPreventiveForm>({
        _id:preventiveForm._id,
        branch:preventiveForm.branch,
        business:preventiveForm.business,
        assigned:preventiveForm.assigned,
        status:preventiveForm.status,
        frequency:preventiveForm.frequency,
        months:preventiveForm.months,
        lastDoneAt:preventiveForm.lastDoneAt,
        batteryChangedAt:preventiveForm.batteryChangedAt,
        observations:preventiveForm.observations,
    })
    //

    

    /* The POST method adds a new entry in the mongodb database. */
    const postData = async (form:IPreventiveForm) => {
        
        try {
            await fetcher.post(form, api.techAdmin.preventives)
            router.push('/tech-admin/preventives')
        } 
        catch (error) {
            console.log(error)
            alert('No se pudo crear el preventivo')
        }
    }

    const putData = async (form:IPreventiveForm) => {      
        try {
            await fetcher.put(form, api.techAdmin.preventives)
            router.push('/tech-admin/preventives')
        } 
        catch (error) {
            console.log(error)
            alert('No se pudo actualizar el preventivo')
        }
    }

    const selectClient = (event:ChangeEvent<HTMLSelectElement>) =>{
        const {value} = event.target
        setFilteredBranches(branches.filter(branch => branch.client.name === value))
    }

    const selectBranch = (event:ChangeEvent<HTMLSelectElement>) =>{
        const {name, value} = event.target
        const branch = branches.find(branch => branch.number.toString() === value.slice(0, value.indexOf(',')))

        setForm({
        ...form,
        [name]: branch,
        }) 
    }

    const selectBusiness = (event:ChangeEvent<HTMLSelectElement>) =>{
        const {name, value} = event.target
        const business = businesses.find(business => business.name === value)

        setForm({
        ...form,
        [name]: business,
        }) 
    }
/* 
    const selectTechnician = (event:ChangeEvent<HTMLSelectElement>) =>{
        
    }


 */
    const changeObservations = (event:ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = event.target

        setForm({
        ...form,
        [name]: value,
        }) 
    }

    const selectFrequency = (event:ChangeEvent<HTMLSelectElement>) =>{
        const {value} = event.target

        setForm({...form, frequency:parseInt(value) as types.Frequency})
    }

    const formValidate = () => {
        let err : IPreventiveFormErrors = { 
            branch:'',
            business:'',
            assigned:'',
            //openedAt:'',
            //status:''}
        }
        if (!form.branch) err.branch = 'branch is required'
        if (!form.business) err.business = 'business is required'
        if (!form.assigned) err.assigned = 'technician is required'
        
        return err
    }

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const errs = formValidate()
        if (errs.branch === '' && errs.business === '' && errs.assigned === '') {
            newPreventive?postData(form):putData(form)
        } else {
            setErrors({ errs })
        }
    }

    const addTechnician = (e:any) => {
        const {value} = e.target
        const technician = technicians.find(technician => technician.fullName === value)
        if(technician)setForm(prev=>{return {...prev, assigned: !prev.assigned.some(x => x._id === technician._id)? [...prev.assigned, technician] : prev.assigned}})

    }

    const deleteTechnician = (id:string) =>{
        //setBranchBusinesses(prev => prev.filter(business=>business._id!=id))
        setForm(prev=>{return {...prev, assigned:prev.assigned.filter(technician => technician._id!=id)}})
        
    }

    const addMonth = (e:any) => {
        const {value}= e.target
        console.log(value)


        setForm(prev => {return {...prev, months: !prev.months.some(month => month === value)? [...prev.months, value] :prev.months}})
    }

    const deleteMonth = (month:types.Month)=>{
        setForm(prev => {return{...prev, months: prev.months.filter(prev => prev != month)}})
    }

    return(
        <>
            <form id='task' className='flex flex-col mb-4' onSubmit={handleSubmit}>

                <div id='select-client'>
                    <div className='mb-2 block'>
                        <Label
                        htmlFor='clients'
                        value='Elegi al cliente'
                        className='text-lg'
                        />
                    </div>
                    <Select
                        id='clients'
                        required={true}
                        onChange={selectClient}
                        name='select-client'
                        defaultValue={'default'}
                        
                    >
                        <option value="default" hidden disabled>{newPreventive?'Seleccione un cliente...' : `${client}`}</option>
                        {clients.map((client, index)=> <option key={index}>{client.name}</option>)}
                    </Select>
                </div>
                <div id='select-branch'>
                    <div className='mb-2 block'>
                        <Label
                        htmlFor='branch'
                        value='Elegi la sucursal'
                        className='text-lg'
                        />
                    </div>
                    <Select
                        id='branches'
                        required={true}
                        onChange={selectBranch}
                        name='branch'
                        defaultValue='default'
                    >
                        <option value="default" hidden disabled>{newPreventive?'Seleccione una sucursal...':`${preventiveForm.branch.number.toString()}, ${preventiveForm.branch.city}`}</option>
                        {filteredBranches && filteredBranches.map((branch, index)=> <option key={index}>{`${branch.number}, ${branch.city.name}`}</option>)}
                    </Select>
                </div>
                <div id='select-business'>
                    <div className='mb-2 block'>
                        <Label
                        htmlFor='business'
                        value='Elegi la empresa'
                        className='text-lg'
                        />
                    </div>
                    
                    <Select
                        id='businesses'
                        required={true}
                        onChange={selectBusiness}
                        name='business'
                        defaultValue='default'
                    >
                        <option value="default" hidden disabled>{newPreventive?'Seleccione una empresa...':preventiveForm.business.name}</option>
                        {form.branch && form.branch.businesses && form.branch.businesses.map((business, index)=> <option key={index}>{business.name}</option>)}
                    </Select>
                </div>
                <div id='select-frequency'>
                    <div className='mb-2 block'>
                        <Label
                        htmlFor='frequency'
                        value='Elegi la frequencia con la que se realizara el preventivo'
                        className='text-lg'
                        />
                    </div>
                    <Select
                        id='frequency'
                        required={true}
                        onChange={selectFrequency}
                        name='frequency'
                        defaultValue='default'
                    >
                        <option value="default" hidden disabled>{newPreventive?'Seleccione la frequencia': preventiveForm.frequency? preventiveForm.frequency>1?`Cada ${preventiveForm.frequency} meses`:'Todos los meses':'Seleccione la frequencia'}</option>
                        {types.frequencies.map((frequency, index)=> <option key={index} value={frequency}>{frequency>1?`Cada ${frequency} meses`:`Todos los meses`}</option>)}
                    </Select>
                </div>
                <div id="textarea">
                    <div className="mb-2 block">
                        <Label
                        htmlFor="observations"
                        value='Agregue observaciones respecto al preventivo'
                        className='text-lg'
                        />
                    </div>
                    <Textarea
                        id="observations"
                        name='observations'
                        onChange={changeObservations}
                        placeholder={newPreventive?"Observaciones...":preventiveForm.observations}
                        required={true}
                        value={form.observations}
                        rows={4}
                        
                    />
                </div>
                <div id='select-technician'>
                    <div className='mb-2 block'>
                        <Label
                        htmlFor='assigned'
                        value='Elegi a los tecnicos responsables de este preventivo'
                        className='text-lg'
                        />
                    </div>

                    <div className='grid grid-cols-6 gap-4'>
                        <Select
                            id='technicians'
                            onChange={addTechnician}
                            value='default'
                            className='mb-4'
                        >
                            <option value="default" disabled hidden>Seleccione un tecnico para agregar</option>
                            {technicians.map((technician, index) =><option key={index} value={technician.fullName}>{technician.fullName}</option>)}
                        </Select>
                    </div>

                    <ul>
                        {form.assigned.map((technician, index) =>{
                            return(
                                <li className='rounded-full bg-gray-300 py-2 px-3 mr-1 mb-2 inline-block' key={index}>
                                    <div className='flex justify-between items-center gap-2 font-semibold'>
                                        {technician.fullName}
                                        <button className='rounded-full bg-white ' onClick={()=>deleteTechnician(technician._id as string)}>
                                            <BsFillXCircleFill color='gray' size={20} />
                                        </button>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>

                    {/* <TechnicianTable technicians={form.assigned} deleteTechnician={deleteTechnician}/> */}
                </div>
                <div id='select-month'>
                    <div className='mb-2 block'>
                        <Label
                        htmlFor='assigned'
                        value='Meses impuestos por el cliente'
                        className='text-lg'
                        />
                    </div>
                    <div className='grid grid-cols-6 gap-4'>
                        <Select
                            id='months'
                            onChange={addMonth}
                            value='default'
                            className='mb-4'
                        >
                            <option value="default" disabled hidden>Seleccione un mes para agregar</option>
                            {types.months.map((month, index) =><option key={index} value={month}>{month}</option>)}
                        </Select>
                    </div>
                    <ul>
                        {form.months.map((month, index) =>{
                            return(
                                <li className='rounded-full bg-gray-300 py-2 px-3 mr-1 mb-2 inline-block' key={index}>
                                    <div className='flex justify-between items-center gap-2 font-semibold'>
                                        {month}
                                        <button className='rounded-full bg-white ' onClick={()=>deleteMonth(month)}>
                                        <BsFillXCircleFill color='gray' size={20} />
                                        </button>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    {/*<MonthTable months={form.months} deleteMonth={deleteMonth}/>*/}
                </div>
                
                <Button type='submit'>
                    Guardar
                </Button>
            </form>
        </>
    )
}

export default PreventiveForm