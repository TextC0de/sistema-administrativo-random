import { NextApiResponse } from 'next';
import dbConnect from 'lib/dbConnect';
import { formatIds } from 'lib/utils';
import Service from '../models/Service';
import { NextConnectApiRequest } from './interfaces';
import { ResponseData } from './types';


//sends only those services that are approved
export async function getAccAdminServices(req:NextConnectApiRequest, res:NextApiResponse<ResponseData>){
    await dbConnect()
    const docServices = await Service.find({status:'Aprobado'})
    if(!docServices) return res.status(500).json({error:'No services found', statusCode:500})
    const services = formatIds(docServices)
    res.status(200).json({data:{services, message:'approved services'}, statusCode:200})
}

//sends only those services that are either pending or sent
export async function getTechAdminServices(req:NextConnectApiRequest, res:NextApiResponse<ResponseData>){
    console.log('techAdminServices')
    await dbConnect()
    const allServices = await Service.find({}).populate(Service.populateParameter())
    if(!allServices) return res.status(500).json({error:'No services found', statusCode:500})
    const pendingServices = allServices.filter(service => service.status === 'Pendiente')
    const sentServices = allServices.filter(service => service.status === 'Enviado')
    const docServices = pendingServices.concat(sentServices)
    if(docServices.length === 0) return res.status(500).json({error:'No services found', statusCode:500})
    const services = formatIds(docServices) 
    //console.log(services)
    res.status(200).json({data:{services, message:'pending and sent services'}, statusCode:200})
}

export async function getAuditorServices(req:NextConnectApiRequest, res:NextApiResponse<ResponseData>){
    await dbConnect()
    const allServices = await Service.find({})
    if(!allServices) return res.status(500).json({error:'No services found', statusCode:500})
    const sentServices = allServices.filter(service => service.status ==='Enviado')
    const approvedServices = allServices.filter(service => service.status === 'Aprobado')
    const docServices = sentServices.concat(approvedServices)
    if(docServices.length === 0) return res.status(500).json({error:'No services found', statusCode:500})
    const services = formatIds(docServices)
    res.status(200).json({data:{services, message:'sent and approved services'}, statusCode:200})

}