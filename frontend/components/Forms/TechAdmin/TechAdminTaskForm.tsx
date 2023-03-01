import { Button, Dropdown, Label, Select, Textarea } from 'flowbite-react';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, MouseEventHandler, useState } from 'react';
import { IBranch, IBusiness, ICity, IClient, ITask, IUser } from 'backend/models/interfaces';
import fetcher from 'lib/fetcher';
import * as api from 'lib/apiEndpoints'
import * as types from 'backend/models/types'
import useLoading from 'frontend/hooks/useLoading';
export interface ITaskForm{
        _id:string
        branch:IBranch,
        business:IBusiness,
        assigned?:IUser,
        description:string,
        openedAt:Date,
        taskType:types.TaskType | '',
        status:types.TaskStatus | '',
}

export interface ITaskFormErrors{
    branch:string,
    business:string,
    assigned:string,
    description:string,
    //openedAt:string,
    taskType:string,
    //status:string,
}

export interface props{
    taskForm:ITaskForm,
    newTask?:boolean
    branches:IBranch[],
    clients:IClient[],
    businesses:IBusiness[],
    technicians:IUser[],
}

const TechAdminTaskForm = ({taskForm, newTask = true, businesses, branches, clients, technicians}:props) =>{
    const router = useRouter()
    const [errors, setErrors] = useState({})
    const [message, setMessage] = useState('')
    const [client, setClient] = useState(taskForm.branch.client?taskForm.branch.client.name:'')
    const [filteredBranches, setFilteredBranches ] = useState<IBranch[]>(branches.filter(branch => branch.client.name === taskForm.branch.client.name))
    const [form, setForm] = useState<ITaskForm>({
        _id:taskForm._id,
        branch:taskForm.branch,
        business:taskForm.business || [],
        assigned:taskForm.assigned,
        taskType:taskForm.taskType,
        description:taskForm.description,
        openedAt:taskForm.openedAt,
        status:taskForm.status
    })
    //

    const {stopLoading, startLoading} = useLoading()

    /* The POST method adds a new entry in the mongodb database. */
    const postData = async (form:ITaskForm) => {
        
        try {
            startLoading()
            await fetcher.post(form, api.techAdmin.tasks)
            await router.push('/tech-admin/tasks')
            stopLoading()
        } 
        catch (error) {
            console.log(error)
            stopLoading()
            alert('No se pudo crear la tarea')
        }
    }

    const putData = async (form:ITaskForm) => {      
        try {
            startLoading()
            await fetcher.put(form, api.techAdmin.tasks)
            await router.push('/tech-admin/tasks')
            stopLoading()
        } 
        catch (error) {
            console.log(error)
            stopLoading()
            alert('No se pudo actualizar la tarea')
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

    const selectTechnician = (event:ChangeEvent<HTMLSelectElement>) =>{
        const {name, value} = event.target
        const technician = technicians.find(technician => technician.fullName === value)

        setForm({
        ...form,
        [name]: technician,
        }) 
    }



    const changeDescription = (event:ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = event.target

        setForm({
        ...form,
        [name]: value,
        }) 
    }

    const selectTaskType = (event:ChangeEvent<HTMLSelectElement>) =>{
        const {value} = event.target

        setForm({...form, taskType:value as types.TaskType})
    }

    const formValidate = () => {
        let err : ITaskFormErrors = { 
            branch:'',
            business:'',
            assigned:'',
            taskType:'',
            description:'',
            //openedAt:'',
            //status:''}
        }
        if (!form.branch) err.branch = 'branch is required'
        if (!form.business) err.business = 'business is required'
        if (!form.assigned) err.assigned = 'technician is required'
        if (!form.taskType) err.taskType = 'task type is required'
        if (!form.description) err.description = 'description is required'
        
        return err
    }

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const errs = formValidate()
        if (errs.branch === '' && errs.business === '' && errs.assigned === '' && errs.taskType === '' && errs.description === '') {
            newTask? postData(form):putData(form)
        } else {
            setErrors({ errs })
        }
    }


    return(
        <>
            <form id='task' className='flex flex-col' onSubmit={handleSubmit}>

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
                        <option value="default" hidden disabled>{newTask?'Seleccione un cliente...' : `${client}`}</option>
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
                        <option value="default" hidden disabled>{newTask?'Seleccione una sucursal...':`${taskForm.branch.number.toString()}, ${taskForm.branch.city.name}`}</option>
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
                        <option value="default" hidden disabled>{newTask?'Seleccione una empresa...':taskForm.business.name}</option>
                        {form.branch && form.branch.businesses && form.branch.businesses.map((business, index)=> <option key={index}>{business.name}</option>)}
                    </Select>
                </div>
                <div id='select-technician'>
                    <div className='mb-2 block'>
                        <Label
                        htmlFor='assigned'
                        value='Elegi al tecnico'
                        className='text-lg'
                        />
                    </div>
                    <Select
                        id='technicians'
                        required={true}
                        onChange={selectTechnician}
                        name='assigned'
                        placeholder={taskForm.assigned?.fullName || ''}
                        defaultValue='default'
                    >
                        <option value="default" hidden disabled>{newTask?'Seleccione un tecnico...': taskForm.assigned?.fullName}</option>
                        {technicians.map((technician, index)=> <option key={index}>{technician.fullName}</option>)}
                    </Select>
                </div>
                <div id='select-taskType'>
                    <div className='mb-2 block'>
                        <Label
                        htmlFor='taskType'
                        value='Elegi el tipo de servicio'
                        className='text-lg'
                        />
                    </div>
                    <Select
                        id='taskType'
                        required={true}
                        onChange={selectTaskType}
                        name='taskType'
                        defaultValue='default'
                    >
                        <option value="default" hidden disabled>{newTask?'Seleccione el tipo de servicio':taskForm.taskType}</option>
                        {types.taskTypes.map((taskType, index)=> <option key={index}>{taskType}</option>)}
                    </Select>
                </div>
                <div id="textarea">
                    <div className="mb-2 block">
                        <Label
                        htmlFor="description"
                        value='Descripcion de la tarea'
                        className='text-lg'
                        />
                    </div>
                    <Textarea
                        id="description"
                        name='description'
                        onChange={changeDescription}
                        placeholder={newTask?"Describa brevemente la tarea...":taskForm.description}
                        required={true}
                        value={form.description}
                        rows={4}
                        
                    />
                </div>
                <Button type='submit'>
                    Guardar
                </Button>
            </form>
        </>
    )
}

export default TechAdminTaskForm