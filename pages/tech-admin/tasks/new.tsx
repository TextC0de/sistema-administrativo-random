import Task from "backend/models/Task"
import Branch from "backend/models/Branch"
import Business from "backend/models/Business"
import Client from "backend/models/Client"
import { IBranch, IBusiness, IClient, IUser } from "backend/models/interfaces"
import User from "backend/models/User"
import TechAdminTaskForm, { ITaskForm } from "frontend/components/Forms/TechAdmin/TechAdminTaskForm"
import dbConnect from "lib/dbConnect"
import { formatIds } from "lib/utils"
import { GetServerSidePropsContext } from "next"

interface props{
    branches:IBranch[],
    clients:IClient[],
    businesses:IBusiness[],
    technicians:IUser[]
}

export default function NewTask(props:props){
    const taskForm:ITaskForm = {
        _id:'',
        branch:{} as IBranch,
        business:{} as IBusiness,
        assigned:{} as IUser,
        taskType:'',
        openedAt:{} as Date,
        status:'',
        description:''
    }

    return(
        <>
            <TechAdminTaskForm newTask={true} taskForm={taskForm} {...props}/>
        </>
    )
}

export async function getServerSideProps(ctx:GetServerSidePropsContext){
    await dbConnect()
    const docBranches = await Branch.find({}).populate(Branch.populateParameter())
    const docClients = await Client.find({})
    const docBusinesses = await Business.find({})
    const docTechnicians = await User.find({roles:'Tecnico'})
    const branches = formatIds(docBranches)
    const clients = formatIds(docClients)
    const businesses = formatIds(docBusinesses)
    const technicians = formatIds(docTechnicians)
    return {props:{branches, clients, businesses, technicians}}
}