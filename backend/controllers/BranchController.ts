import { NextConnectApiRequest } from './interfaces';
import { NextApiResponse } from 'next';
import { ResponseData } from './types';
import BranchModel, {Branch} from 'backend/models/Branch';
import dbConnect from 'lib/dbConnect';
import { formatIds } from 'lib/utils';
import { Business } from 'backend/models/Business';
import mongoose from 'mongoose';

const BranchController = {
    putBranch: async(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>)=>{
        const {body:{_id, number, city, client, businesses}} = req 
        const businessesIds:mongoose.Types.ObjectId[] = businesses.map((business:Business) => business._id) 
        //console.log(businessesIds)    
        await dbConnect()
        const branchForm = {number, city:city._id, client:client._id, businesses:businessesIds}
        //console.log(branchForm)
        try {
            const newBranch = await BranchModel.findByIdAndUpdate(_id, branchForm, {
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
            const deletedBranch = await BranchModel.findOne({number, client:client._id})
            if(deletedBranch){
                deletedBranch.city = city._id
                deletedBranch.businesses = businessesIds
                deletedBranch.restore()
                return res.json({data:{message:'created branch succesfully'}})
            }
            const newBranch = await BranchModel.create(branchForm)
            if(!newBranch) return res.json({statusCode:500, error:'could not create branch'})
            return res.json({data:{message:'created branch succesfully'}})
        } catch (error) {
            console.log(error);
            return res.json({statusCode:500, error:'could not create branch'})
        }
    },
    deleteBranch: async(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>)=>{
        const {body:{_id}} = req
        await dbConnect()
        const deletedBranch = BranchModel.findById(_id)
        if(!deletedBranch) return res.json({statusCode:500, error:'could not delete Branch'})
        await deletedBranch.softDelete()
        //const branch = formatIds(newBranch)
        res.json({data:{message:'deleted branch succesfully'}})
    }
}

export default BranchController