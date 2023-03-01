import { prop, modelOptions, getModelForClass, DocumentType, ReturnModelType } from "@typegoose/typegoose";
import dbConnect from "lib/dbConnect";
import mongoose from "mongoose";
import BranchModel, {Branch} from './Branch'

@modelOptions({schemaOptions:{timestamps:true}})
export class Business{
    _id: mongoose.Types.ObjectId

    @prop({type:String, required:true, unique:true})
    name:string

    @prop({type:Boolean, default:false})
    deleted:boolean

    static async findUndeleted(this:ReturnModelType<typeof Business>, filter:Object = {}){
        return await this.find({...filter, deleted:false})
    }

    static async findOneUndeleted(this:ReturnModelType<typeof Business>, filter:Object = {}){
        return this.findOne({...filter, deleted:false})
    }
    
    async softDelete(this:DocumentType<Business>){
        this.deleted = true
        await this.save()
    }

    async restore(this:DocumentType<Business>){
        this.deleted = false
        await this.save()
    }

    async getBranches(this:Business){
        return await BranchModel.findUndeleted({businesses:this})
    }
}

export default getModelForClass(Business)