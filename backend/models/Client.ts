import { prop, modelOptions, getModelForClass } from "@typegoose/typegoose";
import dbConnect from "lib/dbConnect";
import mongoose from "mongoose";
import BranchModel, {Branch} from './Branch'

@modelOptions({schemaOptions:{timestamps:true}})
export class Client {
    _id:mongoose.Types.ObjectId | string

    @prop({type:String, required:true, unique:true})
    name:string

    async getBranches(this:Client) {
        await dbConnect()
        const docBranches = await BranchModel.find({client:this}).populate(Branch.getPopulateParameters())    
        return docBranches
    }
}

export default getModelForClass(Client)