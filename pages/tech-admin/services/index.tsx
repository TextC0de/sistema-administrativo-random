import { GetServerSidePropsContext } from 'next'
import { useEffect, useState } from 'react'
import ServiceTechAdminTable from 'frontend/components/Tables/ServiceTable/ServiceTechAdminTable'
import dbConnect from 'lib/dbConnect'
import { formatIds } from 'lib/utils'
import { IService } from 'backend/models/interfaces'
import Service from 'backend/models/Service'

interface IServiceProps{
    propServices:IService[]
}

export default function TechAdminServices({propServices}:IServiceProps){
    const [services, setServices] = useState<IService[]>(propServices)


    return(
        <>
            <h2>Servicios Activos</h2>
            <div>
                
            </div>
            <hr />
            {services && <ServiceTechAdminTable services={services}/>}
        </>
    )
}

export async function getServerSideProps({req, res}:GetServerSidePropsContext){
    console.log('techAdminServices')
    await dbConnect()
    const allServices = await Service.find({}).populate(Service.populateParameter())
    if(!allServices) return {props:{}}
    const pendingServices = allServices.filter(service => service.status === 'Pendiente')
    const sentServices = allServices.filter(service => service.status === 'Enviado')
    const docServices = pendingServices.concat(sentServices)
    if(docServices.length === 0) return {props:{}}
    const propServices = formatIds(docServices) 
    //console.log(services)
    return {props:{propServices}}
}