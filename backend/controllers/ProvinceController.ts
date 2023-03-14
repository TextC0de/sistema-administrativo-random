import { NextApiResponse } from 'next';
import dbConnect from 'lib/dbConnect';
import { formatIds } from 'lib/utils';
import Province from '../models/Province';
import { NextConnectApiRequest } from './interfaces';
import { ResponseData } from './types';

const ProvinceController = {
    put: async(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>)=>{
        const {body:{_id,name}} = req
    
        await dbConnect()
        const provinceForm = {name}
        const newProvince = await Province.findByIdAndUpdate(_id, provinceForm, {
            new: true,
            runValidators: true,
          }
        )
        if(!newProvince) return res.json({statusCode:500, error:'could not update province'})
        const province = formatIds(newProvince)
        res.json({data:{province, message:'updated province succesfully'}})
    },
    post: async(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>)=>{
        const {body:{name}} = req
        await dbConnect()
        const provinceForm = {name}
        const deletedProvince = await Province.findOne({name})
        if(deletedProvince){
            await deletedProvince.restore()
            return res.json({data:{deletedProvince, message:'created province succesfully'}})
        }
        const newProvince = await Province.create(provinceForm)
        if(!newProvince) return res.json({statusCode:500, error:'could not create province'})
    
        const province = formatIds(newProvince)
        res.json({data:{province, message:'created province succesfully'}})
    },
    delete: async(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>)=>{
        const {body:{_id}} = req
    
        await dbConnect()
        const deletedProvince = await Province.findById(_id)
        if(!deletedProvince) return res.json({statusCode:500, error:'could not delete province'})
        await deletedProvince.softDelete()
        res.json({data:{message:'deleted province succesfully'}})
    },
    get:async(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>)=>{
        await dbConnect()
        const provinces = await Province.findUndeleted()
        if(!provinces) return res.json({statusCode:500, error:'no provinces found'})
        res.json({data:{provinces:formatIds(provinces), message:'provinces found'}, statusCode:200})
    }
}

export default ProvinceController