import { NextApiResponse } from 'next';
import dbConnect from 'lib/dbConnect';
import { formatIds } from 'lib/utils';
import Province from '../models/Province';
import { NextConnectApiRequest } from './interfaces';
import { ResponseData } from './types';



export async function putProvince(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>){
    const {query:{id}, body:{name}} = req

    await dbConnect()
    const provinceForm = {name}
    const newProvince = await Province.findByIdAndUpdate(id, provinceForm, {
        new: true,
        runValidators: true,
      }
    )
    if(!newProvince) return res.json({statusCode:500, error:'could not update province'})
    const province = formatIds(newProvince)
    res.json({data:{province, message:'updated province succesfully'}})
}

export async function postProvince(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>){
    const {body:{name}} = req
    await dbConnect()
    const provinceForm = {name}
    const newProvince = await Province.create(provinceForm)
    if(!newProvince) return res.json({statusCode:500, error:'could not create province'})

    const province = formatIds(newProvince)
    res.json({data:{province, message:'created province succesfully'}})
}

export async function deleteProvince(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>){
    const {query:{id}, body:{name}} = req

    await dbConnect()
    const deletedProvince = await Province.findByIdAndDelete(id)
    if(!deletedProvince) return res.json({statusCode:500, error:'could not delete province'})
    //const province = formatIds(newProvince)
    res.json({data:{message:'deleted province succesfully'}})
}