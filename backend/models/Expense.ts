import mongoose from 'mongoose';
import dbConnect from 'lib/dbConnect';
import Activity from './Activity';
import Image from './Image';
import { IExpense, ExpenseModel, ITask, TaskModel, IExpenseMethods } from './interfaces';
import Task from './Task';
import User from './User';



const ExpenseSchema = new mongoose.Schema<IExpense, ExpenseModel, IExpenseMethods>({
    doneBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    expenseType:{
        type:String,
        required:true,
    },
    paySource:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true
    },
    image:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Image',
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    task:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Task',
        required:false
    },
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

},{timestamps:true})

ExpenseSchema.statics.populateParameter = function(){
    return [
        {
            path:'doneBy'
        },
        {
            path:'image',
        },
        {
            path:'task',
            populate:Task.populateParameter()
        },
        {
            path:'auditor'
        },
        {
            path:'activity'
        }
    ]
}

ExpenseSchema.methods.getDoneBy = async function(this:IExpense) {
    await dbConnect()
    return await User.findById(this.doneBy)
}

ExpenseSchema.methods.getImage = async function(this:IExpense){
    await dbConnect()
    return await Image.findById(this.image)
}

ExpenseSchema.methods.getTask = async function(this:IExpense){
    await dbConnect()
    return await Task.findById(this.task)
}

ExpenseSchema.methods.getAuditor = async function(this:IExpense){
    await dbConnect()
    return await User.findById(this.auditor)
}

ExpenseSchema.methods.getActivity = async function(this:IExpense){
    await dbConnect()
    return await Activity.findById(this.activity)
}


export default mongoose.models.Expense as ExpenseModel || mongoose.model<IExpense, ExpenseModel>('Expense', ExpenseSchema)