import { GetServerSidePropsContext } from 'next'
import { IProvince, ICity, CityModel, IImage, ImageModel, IService } from 'backend/models/interfaces'
import mongoose from 'mongoose'
import dbConnect from 'lib/dbConnect'
import User from 'backend/models/User'

import Province from 'backend/models/Province'
import City from 'backend/models/City'
import Client from 'backend/models/Client'
import Branch from 'backend/models/Branch'
import Business from 'backend/models/Business'
import Service from 'backend/models/Service'
import { dmyDateString, formatIds } from '../lib/utils'
import ServiceTechAdminTable from '../frontend/components/Tables/ServiceTable/ServiceTechAdminTable'







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
    //console.log(services);
    
    return(
        <>
            {/* <h1>Testing!</h1> */}
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
    docServices[1] = docServices[0] 
    docServices[2] = docServices[0] 
    docServices[3] = docServices[0] 
    const services = formatIds(docServices)
    //console.log(services[0]);
    
    return { props: {services} }

  }