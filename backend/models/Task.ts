import mongoose from 'mongoose';
import Activity from './Activity';
import Branch from './Branch';
import Business from './Business';
import { IExpense, IPopulateParameter, ITask, ITaskMethods, TaskModel } from './interfaces';
import User from './User';
import Image from './Image';
import dbConnect from 'lib/dbConnect';
import Expense from './Expense';



const TaskSchema = new mongoose.Schema<ITask,TaskModel, ITaskMethods>({
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
    taskType:{
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
    description:{
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
    },
    closedAt:{
        type:Date,
        required:false,
    }

},{timestamps:true})

TaskSchema.statics.populateParameter = function(){
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

TaskSchema.methods.getBranch = async function(this:ITask) {
    await dbConnect()
    return await Branch.findById(this.branch)
}

TaskSchema.methods.getBusiness = async function(this:ITask) {
    await dbConnect()
    return await Business.findById(this.business)
}

TaskSchema.methods.getAssigned = async function(this:ITask) {
    await dbConnect()
    return await User.findById(this.assigned)
}

TaskSchema.methods.getParticipants = async function(this:ITask) {
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

TaskSchema.methods.getActivity = async function(this:ITask) {
    await dbConnect()
    return await Activity.findById(this.activity)
}

TaskSchema.methods.getAuditor = async function(this:ITask) {
    await dbConnect()
    return await User.findById(this.auditor)
}

TaskSchema.methods.getImage = async function(this:ITask) {
    await dbConnect()
    return await Image.findById(this.image)
}

TaskSchema.methods.getExpenses = async function(this:ITask):Promise<IExpense[]> {
    await dbConnect()
    return await Expense.find({task:this._id})
}


export default mongoose.models.Task as TaskModel || mongoose.model<ITask,TaskModel>('Task', TaskSchema)