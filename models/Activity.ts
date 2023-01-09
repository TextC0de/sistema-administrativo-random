import mongoose from "mongoose";
import dbConnect from "../lib/dbConnect";
import Expense from "./Expense";
import { IActivity, ActivityModel, IPopulateParameter, IActivityMethods} from "./interfaces";
import Service from "./Service";
import User from "./User";


const ActivitySchema = new mongoose.Schema<IActivity, ActivityModel, IActivityMethods>({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    openedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:false,
    }],
    finishDate:{
        type:Date,
        required:false
    }
},{timestamps:true})

ActivitySchema.statics.populateParameter = function():IPopulateParameter[]{
    return [
        {
            path:'openedBy'
        },
        {
            path:'participants'
        }
    ]
}

ActivitySchema.methods.getOpenedBy = async function(this:IActivity) {
    await dbConnect()
    return await User.findById(this.openedBy)
}

ActivitySchema.methods.getParticipants = async function(this:IActivity) {
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

ActivitySchema.methods.getServices = async function(this:IActivity) {
    await dbConnect()
    return await Service.find({activity:this._id})
}

ActivitySchema.methods.getExpenses = async function(this:IActivity){
    await dbConnect()
    return await Expense.find({activity:this._id})
}


export default mongoose.models.Activity as ActivityModel || mongoose.model<IActivity, ActivityModel>('Activity', ActivitySchema)