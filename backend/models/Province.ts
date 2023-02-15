import { prop, modelOptions, getModelForClass } from "@typegoose/typegoose";
import dbConnect from "lib/dbConnect";
import CityModel, {City} from './City'
import BranchModel, { Branch } from "./Branch";
import mongoose from "mongoose";


@modelOptions({schemaOptions:{timestamps:true}})
export class Province{
    _id:mongoose.Types.ObjectId | string

    @prop({type:String, required:true, unique:true})
    name:string

    async getCities(this:Province):Promise<City[]>{
        await dbConnect()
        return await CityModel.find({province:this})
    }

    async getBranches(this:Province):Promise<Branch[]>{
        await dbConnect()
        return BranchModel.find({city:{province:this}})
    }
}

export default getModelForClass(Province)
  