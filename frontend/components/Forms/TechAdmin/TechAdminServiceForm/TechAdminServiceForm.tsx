import { Dropdown, Label, Select } from 'flowbite-react';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, MouseEventHandler, useState } from 'react';
import { IBranch, IBusiness, IClient, IService, IUser } from 'backend/models/interfaces';
import * as apiEndpoints from 'lib/apiEndpoints'
import * as types from 'backend/models/types'

export interface IServiceForm{
        branch:IBranch,
        business:IBusiness,
        assigned?:IUser,
        openedAt:Date,
        serviceType:types.ServiceType,
        status:types.ServiceStatus,
}

export interface IServiceFormErrors{
    branch:string,
    business:string,
    assigned:string,
    //openedAt:string,
    serviceType:string,
    //status:string,
}

export interface props{
    serviceForm:IServiceForm,
    newService?:boolean
    branches:IBranch[],
    clients:IClient[],
    businesses:IBusiness[],
    technicians:IUser[],
}

const TechAdminServiceForm = ({serviceForm, newService = true, businesses, branches, clients, technicians}:props) =>{
    const router = useRouter()
    const contentType = 'application/json'
    const [errors, setErrors] = useState({})
    const [message, setMessage] = useState('')
    const [client, setClient] = useState(serviceForm.branch.client.name)
    const [filteredBranches, setFilteredBranches ] = useState<IBranch[]>()
    const [form, setForm] = useState<IServiceForm>({
        branch:serviceForm.branch,
        business:serviceForm.business,
        assigned:serviceForm.assigned,
        serviceType:serviceForm.serviceType,
        openedAt:serviceForm.openedAt,
        status:serviceForm.status
    })
    //

    

    /* The POST method adds a new entry in the mongodb database. */
    const postData = async (form:IServiceForm) => {
        try {
            const res: Response = await fetch(apiEndpoints.techAdmin.services, {
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
                throw new Error('failed to login')
                
            }
            router.push('/')
        } 
        catch (error) {
            console.log(error)

        }
    }

    const selectClient = (event:ChangeEvent<HTMLSelectElement>) =>{
        const {value} = event.target
        //setClient(value)
        console.log(branches[0]);
        
        setFilteredBranches(branches.filter(branch => branch.client.name === value))
    }

    const selectBranch = (event:ChangeEvent<HTMLSelectElement>) =>{
        const {name, value} = event.target
        const selectedBranch = branches.filter(branch => branch.number.toString() === value)

        setForm({
        ...form,
        [name]: selectedBranch,
        }) 
    }

    const selectBusiness = (event:ChangeEvent<HTMLSelectElement>) =>{
        const {name, value} = event.target
        const selectedBusiness = businesses.filter(business => business.name === value)

        setForm({
        ...form,
        [name]: selectedBusiness,
        }) 
    }

    const selectTechnician = (event:ChangeEvent<HTMLSelectElement>) =>{
        const {name, value} = event.target
        const selectedTechnician = technicians.filter(technician => technician.fullName === value)

        setForm({
        ...form,
        [name]: selectedTechnician,
        }) 
    }



    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target

        setForm({
        ...form,
        [name]: value,
        }) 
    }


    const formValidate = () => {
        let err : IServiceFormErrors = { 
            branch:'',
            business:'',
            assigned:'',
            serviceType:'',
            //openedAt:'',
            //status:''}
        }
        if (!form.branch) err.branch = 'branch is required'
        if (!form.business) err.business = 'business is required'
        if (!form.assigned) err.assigned = 'technician is required'
        if (!form.serviceType) err.serviceType = 'service type is required'

        return err
    }

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const errs = formValidate()
        if (errs.branch === '' && errs.business === '' && errs.assigned === '' && errs.serviceType === '') {
            if(newService) setForm({...form, openedAt: new Date()})
            postData(form)
        } else {
            setErrors({ errs })
        }
    }

    return(
        <>
            <form id='service' onSubmit={handleSubmit}>

                <div id='select-client'>
                    <div className='mb-2 block'>
                        <Label
                        htmlFor='clients'
                        value='Elegi al cliente'
                        />
                    </div>
                    <Select
                        id='clients'
                        required={true}
                        onChange={selectClient}
                        name='select-client'
                        placeholder={client || ''}
                    >
                        {clients.map(client=> <option>{client.name}</option>)}
                    </Select>
                </div>
                <div id='select-branch'>
                    <div className='mb-2 block'>
                        <Label
                        htmlFor='branch'
                        value='Elegi la sucursal'
                        />
                    </div>
                    <Select
                        id='branches'
                        required={true}
                        onChange={selectBranch}
                        name='branch'
                        placeholder={serviceForm.branch.number.toString() || ''}
                    >
                        {filteredBranches && filteredBranches.map(branch=> <option>{branch.number}</option>)}
                    </Select>
                </div>
                <div id='select-business'>
                    <div className='mb-2 block'>
                        <Label
                        htmlFor='business'
                        value='Elegi la empresa'
                        />
                    </div>
                    <Select
                        id='businesses'
                        required={true}
                        onChange={selectBusiness}
                        name='business'
                        placeholder={serviceForm.business.name || ''}
                    >
                        {businesses.map(business=> <option>{business.name}</option>)}
                    </Select>
                </div>
                <div id='select-technician'>
                    <div className='mb-2 block'>
                        <Label
                        htmlFor='assigned'
                        value='Elegi al tecnico'
                        />
                    </div>
                    <Select
                        id='technicians'
                        required={true}
                        onChange={selectTechnician}
                        name='assigned'
                        placeholder={serviceForm.assigned?.fullName || ''}
                    >
                        {technicians.map(technician=> <option>{technician.fullName}</option>)}
                    </Select>
                </div>
            </form>
        </>
    )
}

export default TechAdminServiceForm