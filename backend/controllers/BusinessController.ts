import { NextApiResponse } from 'next';
import dbConnect from 'lib/dbConnect';
import { formatIds } from 'lib/utils';
import Business from 'backend/models/Business';
import { NextConnectApiRequest } from './interfaces';
import { ResponseData } from './types';

const BusinessController = {
    putBusiness: async (req: NextConnectApiRequest, res: NextApiResponse<ResponseData>)=>{
        const {body:{_id, name}} = req
    
        await dbConnect()
        const businessForm = {name}
        const newBusiness = await Business.findByIdAndUpdate(_id, businessForm, {
            new: true,
            runValidators: true,
          }
        )
        if(!newBusiness) return res.json({statusCode:500, error:'could not update Business'})
        const business = formatIds(newBusiness)
        res.json({data:{business, message:'updated Business succesfully'}})
    },
    postBusiness: async(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>)=>{
        const {body:{name}} = req
        await dbConnect()
        const businessForm = {name}
        const newBusiness = await Business.create(businessForm)
        if(!newBusiness) return res.json({statusCode:500, error:'could not create Business'})
    
        const business = formatIds(newBusiness)
        res.json({data:{business, message:'created Business succesfully'}})
    },
    deleteBusiness: async(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>)=> {
        const {body:_id} = req
    
        await dbConnect()
        const deletedBusiness = await Business.findByIdAndDelete(_id)
        if(!deletedBusiness) return res.json({statusCode:500, error:'could not delete Business'})
        //const Business = formatIds(newBusiness)
        res.json({data:{message:'deleted Business succesfully'}})
    }
}

export default BusinessController