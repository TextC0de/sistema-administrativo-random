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

    static async getUndeleted(this:ReturnModelType<typeof City>, filter:Object){
        const newFilter = {...filter, deleted:false}
        console.log(newFilter)
        const cities = await this.find(newFilter)
        console.log(cities);
        return cities
        
    }

    static async getOneUndeleted(this:ReturnModelType<typeof City>, filter:Object){
        return this.findOne({...filter, deleted:false})
    }

    static async getByIdUndeleted(this:ReturnModelType<typeof City>, id:mongoose.Types.ObjectId|string){
        const doc = await this.findById(id)
        if(!doc) return {}
        if(doc.deleted) return {}
        return doc
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
        await dbConnect()
        return BranchModel.find({city:this})
    }
}

export default getModelForClass(City)