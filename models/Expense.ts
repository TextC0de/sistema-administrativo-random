import mongoose from "mongoose";
import dbConnect from "../lib/dbConnect";
import Activity from "./Activity";
import Image from "./Image";
import { IExpense, ExpenseModel, IService, ServiceModel, IExpenseMethods } from "./interfaces";
import Service from "./Service";
import User from "./User";



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
    service:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Service',
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

})

ExpenseSchema.statics.populateParameter = function(){
    return [
        {
            path:'doneBy'
        },
        {
            path:'image',
        },
        {
            path:'service',
            populate:Service.populateParameter()
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

ExpenseSchema.methods.getService = async function(this:IExpense){
    await dbConnect()
    return await Service.findById(this.service)
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