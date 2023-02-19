import { prop, Ref, getModelForClass, ReturnModelType, modelOptions, DocumentType  } from "@typegoose/typegoose";
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

    @prop({type:Boolean, default:false})
    deleted:boolean


    static getPopulateParameters():IPopulateParameter[]{
        return [
            {
                path:'openedBy',
                match:{'openedBy.deleted':{$ne:true}}
            },
            {
                path:'participants',
                match:{'participants.deleted':{$ne:true}}

            }
        ]
    }

    static async findUndeleted(this:ReturnModelType<typeof Activity>, filter:Object = {}){
        return await this.find({...filter, deleted:false}).populate(this.getPopulateParameters())
    }

    static async findOneUndeleted(this:ReturnModelType<typeof Activity>, filter:Object = {}){
        return this.findOne({...filter, deleted:false}).populate(this.getPopulateParameters())
    }
    
    async softDelete(this:DocumentType<Activity>){
        this.deleted = true
        await this.save()
    }

    async restore(this:DocumentType<Activity>){
        this.deleted = false
        await this.save()
    }

    async getTasks(this:Activity):Promise<Task[]>{
        return TaskModel.findUndeleted({activity:this})
    }

    async getExpenses(this:Activity):Promise<Expense[]>{
        return ExpenseModel.findUndeleted({activity:this})
    }
}

export default getModelForClass(Activity)