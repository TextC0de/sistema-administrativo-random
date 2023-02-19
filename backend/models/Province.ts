import { prop, modelOptions, getModelForClass, ReturnModelType, DocumentType } from "@typegoose/typegoose";
import dbConnect from "lib/dbConnect";
import CityModel, {City} from './City'
import BranchModel, { Branch } from "./Branch";
import mongoose from "mongoose";


@modelOptions({schemaOptions:{timestamps:true}})
export class Province{
    _id:mongoose.Types.ObjectId | string

    @prop({type:String, required:true, unique:true})
    name:string

    @prop({type:Boolean, default:false})
    deleted:boolean

    static async findUndeleted(this:ReturnModelType<typeof Province>, filter:Object = {}){
        return await this.find({...filter, deleted:false})
    }

    static async findOneUndeleted(this:ReturnModelType<typeof Province>, filter:Object = {}){
        return this.findOne({...filter, deleted:false})
    }
    
    async softDelete(this:DocumentType<Province>){
        this.deleted = true
        await this.save()
    }

    async restore(this:DocumentType<Province>){
        this.deleted = false
        await this.save()
    }

    async getCities(this:Province):Promise<City[]>{
        return await CityModel.findUndeleted({province:this})
    }

    async getBranches(this:Province):Promise<Branch[]>{
        return await BranchModel.findUndeleted({city:{province:this}})
    }
}

export default getModelForClass(Province)
  