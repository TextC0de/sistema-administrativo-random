import mongoose from "mongoose";
import Client from "./Client";
import { IBranch, ICity, IClient, IService, BranchModel, IBranchMethods } from "./interfaces";
import City from "./City";
import dbConnect from "../lib/dbConnect";
import Service from "./Service";



const BranchSchema = new mongoose.Schema<IBranch, BranchModel, IBranchMethods>({
    number:{
        type:Number,
        required:true,
    },
    city:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'City',
        required:true
    },
    client:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Client',
        required:true
    }
},{timestamps:true})

BranchSchema.statics.populateParameter = function(){
    return [
        {
            path:'city', 
            populate:City.populateParameter()
        },
        {
            path:'client'
        }
    ]
}

BranchSchema.methods.getClient = async function(this:IBranch):Promise<IClient | null>{
    await dbConnect()        
    return await Client.findById(this.client)
} 


BranchSchema.methods.getCity= async function(this:IBranch):Promise<ICity | null>{
    await dbConnect()
    return await City.findById(this.city)
} 

BranchSchema.methods.getServices = async function(this:IBranch):Promise<IService[]>{
    await dbConnect()
    return await Service.find({branch:this._id})
}

export default mongoose.models.Branch as BranchModel || mongoose.model<IBranch, BranchModel>('Branch', BranchSchema)