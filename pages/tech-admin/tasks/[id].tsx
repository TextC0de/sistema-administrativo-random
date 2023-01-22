import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import dbConnect from 'lib/dbConnect';
import { formatIds } from 'lib/utils';
import TechAdminTaskForm, { ITaskForm } from 'frontend/components/Forms/TechAdmin/TechAdminTaskForm';
import { IBranch, IBusiness, IClient, ITask, IUser } from 'backend/models/interfaces';
import Task from 'backend/models/Task';
import Branch from 'backend/models/Branch';
import Business from 'backend/models/Business';
import Client from 'backend/models/Client';
import User from 'backend/models/User';

interface props{
    task:ITask,
    branches:IBranch[],
    clients:IClient[],
    businesses:IBusiness[],
    technicians:IUser[],
}

export default function TaskView({task, branches, clients, businesses, technicians}:props){
    const form:ITaskForm = {
        _id:task._id as string,
        branch:task.branch,
        business:task.business,
        assigned:task.assigned,
        taskType:task.taskType,
        openedAt:task.openedAt,
        status:task.status,
        description:task.description
    }

    return(
        <>
            <TechAdminTaskForm taskForm={form} newTask={false} businesses={businesses} branches={branches} clients={clients} technicians={technicians}/>

        </>
    )
}

export async function getServerSideProps(ctx:GetServerSidePropsContext){
    const {params} = ctx
    await dbConnect()
    const docTask = await Task.findById(params?.id).populate(Task.populateParameter())
    if(!docTask) return{props:{}}
    const task = formatIds(docTask)
    const docBranches = await Branch.find({}).populate(Branch.populateParameter())
    const docClients = await Client.find({})
    const docBusinesses = await Business.find({})
    const docTechnicians = await User.find({roles:'Tecnico'})
    const branches = formatIds(docBranches)
    const clients = formatIds(docClients)
    const businesses = formatIds(docBusinesses)
    const technicians = formatIds(docTechnicians)
    return {props:{task, branches, clients, businesses, technicians}}
}