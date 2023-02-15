import { NextConnectApiRequest } from './interfaces';
import { NextApiResponse } from 'next';
import { ResponseData } from './types';
import Branch from 'backend/models/Branch';
import dbConnect from 'lib/dbConnect';
import { formatIds } from 'lib/utils';
import { Business } from 'backend/models/Business';
import { ReturnModelType } from '@typegoose/typegoose';
import mongoose from 'mongoose';

const BranchController = {
    putBranch: async(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>)=>{
        const {body:{_id, number, city, client, businesses}} = req 
        const businessesIds:mongoose.Types.ObjectId[] = businesses.map((business:Business) => business._id) 
        //console.log(businessesIds)    
        await dbConnect()
        const branchForm = {number, city:city._id, client, businesses:businessesIds}
        //console.log(branchForm)
        try {
            const newBranch = await Branch.findByIdAndUpdate(_id, branchForm, {
                new: true,
                runValidators: true,
                })
            if(!newBranch) res.json({statusCode:500, error:'could not update branch'})
            //console.log(newBranch)
            const branch = formatIds(newBranch)
            res.json({data:{branch, message:'updated branch succesfully'}})
        }
        catch (error) {
            console.log(error);
            return res.json({statusCode:500, error:'could not update branch'})
        }
    },
    postBranch: async(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>)=>{
        const {body:{number, city, client, businesses}} = req 
        const businessesIds = businesses.map((business:Business) => business._id)
        await dbConnect()
        const branchForm = {number, city:city._id, client:client._id, businesses:businessesIds}
        try {
            const newBranch = await Branch.create(branchForm)
            if(!newBranch) return res.json({statusCode:500, error:'could not create branch'})
            return res.json({data:{message:'created branch succesfully'}})
        } catch (error) {
            console.log(error);
            return res.json({statusCode:500, error:'could not create branch'})
        }
    },
    deleteBranch: async(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>)=>{
        const {body} = req
        await dbConnect()
        const deletedBranch = await Branch.findByIdAndDelete(body._id)
        if(!deletedBranch) return res.json({statusCode:500, error:'could not delete Branch'})
        //const branch = formatIds(newBranch)
        res.json({data:{message:'deleted branch succesfully'}})
    }
}

export default BranchController