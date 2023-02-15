import { modelOptions, getModelForClass, index, prop, Ref } from "@typegoose/typegoose"
import { Province } from "./Province"
import BranchModel from './Branch'
import dbConnect from "lib/dbConnect"
import mongoose from "mongoose"

@index({name:1, province:1}, {unique:true})
@modelOptions({schemaOptions:{timestamps:true}})
export class City{
    _id:mongoose.Types.ObjectId | string
    
    @prop({type:String, required:true})
    name:string
    
    @prop({ref:'Province', required:true})
    province:Ref<Province>

    static getPopulateParameters(){
        return[{path:'province', model:'Province'}]
    }

    async getBranches(this:City){
        await dbConnect()
        return BranchModel.find({city:this})
    } 
}

export default getModelForClass(City)