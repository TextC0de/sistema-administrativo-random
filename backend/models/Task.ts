import { prop, Ref, getModelForClass, modelOptions, ReturnModelType  } from "@typegoose/typegoose";
import dbConnect from "lib/dbConnect";
import { IPopulateParameter } from "./interfaces";
import UserModel, {User} from './User'
import ExpenseModel, {Expense} from "./Expense";
import {Branch} from './Branch'
import { TaskType, TaskStatus } from "./types";
import { Business } from "./Business";
import {Activity} from "./Activity";
import {Image} from "./Image";
import mongoose from "mongoose";

@modelOptions({schemaOptions:{timestamps:true}})
export class Task {
    
    @prop({ref:'Branch', required:true})
    branch:Ref<Branch>
    
    @prop({ref:'Business', required:true})
    business:Ref<Business>
    
    @prop({ref:'User', required:true})
    assigned:Ref<User>

    @prop({type:Date, required:true})
    openedAt:Date
    
    @prop({type:String, required:true})
    taskType:TaskType
    
    @prop({type:String, required:true})
    status:TaskStatus
    
    @prop({type:String, required:true})
    description:string
    
    @prop({type:mongoose.SchemaTypes.Array, ref: 'User' , required:false})
    participants?:Ref<User>[]
    
    @prop({ref: 'User', required:false})
    auditor?:Ref<User>

    @prop({ref: 'Activity', required:false})
    activity?:Ref<Activity>
    
    @prop({type: String, required:false})
    operatorName?:string
    
    @prop({ref: 'Image', required:false})
    image?:Ref<Image>
    
    @prop({type:Number , required:false})
    workOrderNumber?:number
    
    @prop({type:Date , required:false})
    closedAt?:Date
 
    static getPopulateParameters(){
        return [
            {
                path:'branch',
                populate:Branch.getPopulateParameters()
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

    async getExpenses(this:Task):Promise<Expense[]>{
        await dbConnect()
        const expenses = await ExpenseModel.find({task:this}).populate(Expense.getPopulateParameters())
        return expenses
    }


  }

  const TaskModel = getModelForClass(Task)
  export default TaskModel