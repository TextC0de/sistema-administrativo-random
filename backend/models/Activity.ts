import { prop, Ref, getModelForClass, ReturnModelType, modelOptions  } from "@typegoose/typegoose";
import dbConnect from "lib/dbConnect";
import { IPopulateParameter } from "./interfaces";
import UserModel, {User} from './User'
import TaskModel,{Task} from './Task'
import ExpenseModel, { Expense } from './Expense'
import mongoose from "mongoose";

@modelOptions({schemaOptions:{timestamps:true}})
export class Activity{
    
    _id:mongoose.Types.ObjectId | string
    
    @prop({type:String, required:true})
    name:string
    
    @prop({type:String, required:true})
    description:string

    @prop({type:Date, required:true})
    startDate:Date
    
    @prop({ref:'User', required:true})
    openedBy:Ref<User>

    @prop({type:mongoose.SchemaTypes.Array, ref:'User', required:true})
    participants:Ref<User>[]

    @prop({type:Date, required:false})
    finishDate:Date

    static getPopulateParameters():IPopulateParameter[]{
        return [
            {
                path:'openedBy'
            },
            {
                path:'participants'
            }
        ]
    }

    async getTasks(this:Activity):Promise<Task[]>{
        await dbConnect()
        return TaskModel.find({activity:this}).populate(Task.getPopulateParameters())
    }

    async getExpenses(this:Activity):Promise<Expense[]>{
        await dbConnect()
        return ExpenseModel.find({activity:this}).populate(Expense.getPopulateParameters())
    }
}

export default getModelForClass(Activity)