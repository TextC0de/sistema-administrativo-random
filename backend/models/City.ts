import { modelOptions, getModelForClass, index, prop, Ref, DocumentType, ReturnModelType } from "@typegoose/typegoose"
import { Province } from "./Province"
import BranchModel from './Branch'
import dbConnect from "lib/dbConnect"
import mongoose from "mongoose"

@index({name:1, province:1}, {unique:true})
@modelOptions({schemaOptions:{timestamps:true}})
export class City{
    _id:mongoose.Types.ObjectId | string
    
    @prop({type:Boolean, default:false})
    deleted:boolean

    @prop({type:String, required:true})
    name:string
    
    @prop({ref:'Province', required:true})
    province:Ref<Province>

    static getPopulateParameters(){
        return[{path:'province', model:'Province', match:{'province.deleted':{$ne:true}}}]
    }

    static async findUndeleted(this:ReturnModelType<typeof City>, filter:Object = {}){
        return await this.find({...filter, deleted:false}).populate(this.getPopulateParameters())
    }

    static async findOneUndeleted(this:ReturnModelType<typeof City>, filter:Object = {}){
        return this.findOne({...filter, deleted:false}).populate(this.getPopulateParameters())
    }
    
    async softDelete(this:DocumentType<City>){
        this.deleted = true
        await this.save()
    }

    async restore(this:DocumentType<City>){
        this.deleted = false
        await this.save()
    }

    async getBranches(this:City){
        return await BranchModel.findUndeleted({city:this})
    }
}

export default getModelForClass(City)