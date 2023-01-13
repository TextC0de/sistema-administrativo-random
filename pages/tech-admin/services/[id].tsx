import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import dbConnect from 'lib/dbConnect';
import { formatIds } from 'lib/utils';
import TechAdminServiceForm, { IServiceForm } from 'frontend/components/Forms/TechAdmin/TechAdminServiceForm/TechAdminServiceForm';
import { IBranch, IBusiness, IClient, IService, IUser } from 'backend/models/interfaces';
import Service from 'backend/models/Service';
import Branch from 'backend/models/Branch';
import Business from 'backend/models/Business';
import Client from 'backend/models/Client';
import User from 'backend/models/User';

interface props{
    service:IService,
    branches:IBranch[],
    clients:IClient[],
    businesses:IBusiness[],
    technicians:IUser[],
}

export default function ServiceView({service, branches, clients, businesses, technicians}:props){
    const form:IServiceForm = {
        branch:service.branch,
        business:service.business,
        assigned:service.assigned,
        serviceType:service.serviceType,
        openedAt:service.openedAt,
        status:service.status
    }

    return(
        <>
            <TechAdminServiceForm serviceForm={form} newService={false} businesses={businesses} branches={branches} clients={clients} technicians={technicians}/>

        </>
    )
}

export async function getServerSideProps(ctx:GetServerSidePropsContext){
    const {params} = ctx
    await dbConnect()
    const docService = await Service.findById(params?.id).populate(Service.populateParameter())
    if(!docService) return{props:{}}
    const service = formatIds(docService)
    const docBranches = await Branch.find({}).populate(Branch.populateParameter())
    const docClients = await Client.find({})
    const docBusinesses = await Business.find({})
    const docTechnicians = await User.find({roles:'Tecnico'})
    const branches = formatIds(docBranches)
    const clients = formatIds(docClients)
    const businesses = formatIds(docBusinesses)
    const technicians = formatIds(docTechnicians)
    return {props:{service, branches, clients, businesses, technicians}}
}