import { GetServerSidePropsContext } from "next"
import { IProvince, ICity, CityModel, IImage, ImageModel, IService } from "../models/interfaces"
import mongoose from "mongoose"
import dbConnect from "../lib/dbConnect"
import User from "../models/User"

import Province from "../models/Province"
import City from "../models/City"
import Client from "../models/Client"
import Branch from "../models/Branch"
import Business from "../models/Business"
import Service from "../models/Service"
import { dmyDateString, formatIds } from "../lib/utils"

function TableCell({children}:{children:any}){
    return(
        <td style={{border:'1px black solid', padding:'5px', borderRadius:'5px'}}> {children}</td>
    )
}

function TableHeader({children}:{children:string}){
    return(
        <th style={{border:'1px black solid', backgroundColor:'blue', color:'white', padding:'5px', borderRadius:'5px'}}> {children}</th>
    )
}

function ServiceTechAdminItem({service}:{service:IService}){
    const openedAt = dmyDateString(new Date(service.openedAt))
    const closedAt = service.closedAt? dmyDateString(new Date(service.closedAt)): service.closedAt
    
    return (
        <tr >
            <TableCell>{openedAt}</TableCell>
            <TableCell>{service.business.name}</TableCell>
            <TableCell>{service.branch.client.name}</TableCell>
            <TableCell>{service.branch.number}</TableCell>
            <TableCell>{service.branch.city.name}</TableCell>
            <TableCell>{service.assigned? service.assigned.fullName:'Sin asignar' }</TableCell>
            <TableCell>{service.status}</TableCell>
            <TableCell>{closedAt? closedAt :''}</TableCell>
        </tr>
    )
}

function ServiceTechAdminTable({services}:{services:IService[]}){
    return(
        <>
            <table>
                <thead>
                    <tr>
                        <TableHeader >Fecha apertura</TableHeader>
                        <TableHeader>Empresa</TableHeader>
                        <TableHeader>Cliente</TableHeader>
                        <TableHeader>Sucursal</TableHeader>
                        <TableHeader>Localidad</TableHeader>
                        <TableHeader>Tecnico Asignado</TableHeader>
                        <TableHeader>Estado</TableHeader>
                        <TableHeader>Fecha cierre</TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service, index) => <ServiceTechAdminItem key={index} service={service}/>)}
                </tbody>
            </table>
        </>
    )
}


function CityCard ({city}:{city:ICity}){
    return (
        <>
            <div style={{border:'1px grey solid', padding:'1em', margin:'5em', borderRadius:'20px'}}>
                <h3>City: {city.name}</h3>
                <h3>Province: {city.province.name}</h3>
            </div>
        </>
    )
}





export default function Test({services}:{services:IService[]}){
    console.log(services);
    
    return(
        <>
            <h1>Testing!</h1>
            {/* <ServiceCard service={service}/> */}
            <ServiceTechAdminTable services={services}/>
        </>
    )
}



export async function getServerSideProps({req,res}:GetServerSidePropsContext) {
    await dbConnect()/* 
    const docBranch = await Branch.findOne({number:297})
    if(!docBranch){
        return { props: {} }
    } */
    const docServices = await Service.find({}).populate(Service.populateParameter())
    docServices[0].openedAt = new Date(Date.now())
    
    const services = formatIds(docServices)
    console.log(services[0].openedAt);
    
    return { props: {services} }

  }