import { prop, Ref, getModelForClass, modelOptions, ReturnModelType  } from "@typegoose/typegoose";
import dbConnect from "lib/dbConnect";
import { IPopulateParameter } from "./interfaces";
import { ExpenseStatus, ExpenseType, PaySource } from "./types";
import UserModel, {User} from './User'
import TaskModel, {Task} from "./Task"
import ActivityModel,{ Activity } from "./Activity";
import {Image} from './Image'

@modelOptions({schemaOptions:{timestamps:true}})
export class Expense{
    @prop({ref: 'User', required:true})
    doneBy:Ref<User>
    
    @prop({type:String, required:true})
    expenseType:ExpenseType
    
    @prop({type:String, required:true})
    paySource:PaySource

    @prop({type:String, required:true})
    status:ExpenseStatus

    @prop({ref: 'Image', required:true})
    image:Ref<Image>

    @prop({type:Number, required:true})
    amount:number

    @prop({ref: 'Task', required:false})
    task?:Ref<Task>

    @prop({ref: 'User', required:false})
    auditor?:Ref<User>
    
    @prop({ref:  'Activity', required:false})
    activity?:Ref<Activity>
    
    static getPopulateParameters(){
        return [
            {
                path:'doneBy'
            },
            {
                path:'image',
            },
            {
                path:'task',
                populate:Task.getPopulateParameters()
            },
            {
                path:'auditor'
            },
            {
                path:'activity'
            }
        ]
    }


}

export default getModelForClass(Expense)