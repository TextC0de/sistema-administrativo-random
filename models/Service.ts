import mongoose from "mongoose";
import Activity from "./Activity";
import Branch from "./Branch";
import Business from "./Business";
import { IExpense, IPopulateParameter, IService, IServiceMethods, ServiceModel } from "./interfaces";
import User from "./User";
import Image from "./Image";
import dbConnect from "../lib/dbConnect";
import Expense from "./Expense";



const ServiceSchema = new mongoose.Schema<IService,ServiceModel, IServiceMethods>({
    branch:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Branch',
        required:true
    },
    business:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Business',
        required:true
    },
    assigned:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    serviceType:{
        type:String,
        required:true,
    },
    openedAt:{
        type:Date,
        required:true,
    },
    status:{
        type:String,
        required:true
    },
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:false
    }],
    auditor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:false
    },
    activity:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Activity',
        required:false
    },
    operatorName:{
        type:String,
        required:false,
    },
    image:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Image',
        required:false
    },
    workOrderNumber:{
        type:Number,
        required:false,
        unique:true
    },
    closedAt:{
        type:Date,
        required:false,
    }

},{timestamps:true})

ServiceSchema.statics.populateParameter = function(){
    return [
        {
            path:'branch',
            populate:Branch.populateParameter()
        },
        {
            path:'business',
        },
        {
            path:'assigned'
        },
        {
            path:'participants'
        },
        {
            path:'auditor'
        },
        {
            path:'activity'
        },
        {
            path:'image'
        }
    ]
}

ServiceSchema.methods.getBranch = async function(this:IService) {
    await dbConnect()
    return await Branch.findById(this.branch)
}

ServiceSchema.methods.getBusiness = async function(this:IService) {
    await dbConnect()
    return await Business.findById(this.business)
}

ServiceSchema.methods.getAssigned = async function(this:IService) {
    await dbConnect()
    return await User.findById(this.assigned)
}

ServiceSchema.methods.getParticipants = async function(this:IService) {
    if(!this.participants){
        return []
    }
    await dbConnect()
    const participantsIds = this.participants
    const participants = await Promise.all(participantsIds.map(async(id) => {
        return await User.findById(id)
    }))
    return participants
}

ServiceSchema.methods.getActivity = async function(this:IService) {
    await dbConnect()
    return await Activity.findById(this.activity)
}

ServiceSchema.methods.getAuditor = async function(this:IService) {
    await dbConnect()
    return await User.findById(this.auditor)
}

ServiceSchema.methods.getImage = async function(this:IService) {
    await dbConnect()
    return await Image.findById(this.image)
}

ServiceSchema.methods.getExpenses = async function(this:IService):Promise<IExpense[]> {
    await dbConnect()
    return await Expense.find({service:this._id})
}


export default mongoose.models.Service as ServiceModel || mongoose.model<IService,ServiceModel>('Service', ServiceSchema)