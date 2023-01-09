import mongoose from "mongoose";
import dbConnect from "../lib/dbConnect";
import Branch from "./Branch";
import Business from "./Business";
import { IBranch, IBusiness, IPopulateParameter, IPreventive, IPreventiveMethods, IUser, PreventiveModel } from "./interfaces";
import User from "./User";


const PreventiveSchema = new mongoose.Schema<IPreventive,PreventiveModel, IPreventiveMethods>({
    assigned:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }],
    business:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Business',
        required:true
    },
    branch:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Branch',
        required:true
    },
    frequency:{ //How often the preventive maintenance has to be done
        type:Number,
        required:false,
    },
    months:[{ //on which months it has to be done
        type:Number,
        required:false
    }],
    lastDoneAt:{ //last time it was done
        type:Date,
        required:false,
    },
    batteryChangedAt:{
        type:Date,
        required:false
    },
    observations:{
        type:String,
        required:false
    },
},{timestamps:true})

PreventiveSchema.statics.populateParameter = function():IPopulateParameter[]{
    return[
        {
            path:'assigned'
        },
        {
            path:'business'
        },
        {
            path:'branch',
            populate:Branch.populateParameter()
        }
    ]
}

PreventiveSchema.methods.getAssigned = async function(this:IPreventive){
    await dbConnect()
    const assignedIds = this.assigned
    const assigned = await Promise.all(assignedIds.map(async(id) => {
        return await User.findById(id)
    }))
    return assigned
}

PreventiveSchema.methods.getBusiness = async function(this:IPreventive):Promise<IBusiness | null>{
    await dbConnect()
    return await Business.findById(this.business)
}

PreventiveSchema.methods.getBranch = async function(this:IPreventive):Promise<IBranch | null>{
    await dbConnect()
    return await Branch.findById(this.branch)
}


export default  mongoose.models.Preventive as PreventiveModel ||mongoose.model<IPreventive,PreventiveModel>('Preventive', PreventiveSchema)