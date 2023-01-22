import { NextApiResponse } from 'next';
import dbConnect from 'lib/dbConnect';
import { formatIds } from 'lib/utils';
import Preventive from '../models/Preventive';
import { NextConnectApiRequest } from './interfaces';
import { ResponseData } from './types';
import { IPreventive } from 'backend/models/interfaces';


const PreventiveController = {
    putPreventive: async(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>)=>{
        const {body} = req    
        await dbConnect()
        const {_id, branch, business, assigned, status, frequency, months, lastDoneAt, batteryChangedAt, observations}:IPreventive = body
        const preventiveForm = {_id, branch, business, assigned, status, frequency, months, lastDoneAt, batteryChangedAt, observations}
        try {
            const newPreventive = await Preventive.findByIdAndUpdate(_id, preventiveForm, {
                new: true,
                runValidators: true,
                })
            if(!newPreventive) res.json({statusCode:500, error:'could not update Preventive'})
            
            res.json({statusCode:200, data:{Preventive:formatIds(newPreventive), message:'updated Preventive succesfully'}})
        }
        catch (error) {
            console.log(error);
            return res.json({statusCode:500, error:'could not update Preventive'})
        }
    },
    postPreventive: async(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>)=>{
        const {body} = req    
        await dbConnect()
        const {branch, business, assigned, status, frequency, months, lastDoneAt, batteryChangedAt, observations}:IPreventive = body
        const preventiveForm = {branch, business, assigned, status, frequency, months, lastDoneAt, batteryChangedAt, observations}
        try {
            const newPreventive = await Preventive.create(preventiveForm)
            if(!newPreventive) return res.json({statusCode:500, error:'could not create Preventive'})
            
            return res.json({statusCode:200, data:{Preventive:formatIds(newPreventive), message:'created Preventive succesfully'}})
        } catch (error) {
            console.log(error);
            return res.json({statusCode:500, error:'could not create Preventive'})
        }
    },
    deletePreventive: async(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>)=>{
        const {body} = req
        await dbConnect()
        const deletedPreventive = await Preventive.findByIdAndDelete(body._id)
        if(!deletedPreventive) return res.json({statusCode:500, error:'could not delete Preventive'})
        //const Preventive = formatIds(newPreventive)
        res.json({statusCode:200, data:{message:'deleted Preventive succesfully'}})
    }
}

export default PreventiveController