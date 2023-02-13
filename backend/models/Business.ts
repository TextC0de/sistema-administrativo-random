import { prop, modelOptions, getModelForClass } from "@typegoose/typegoose";
import dbConnect from "lib/dbConnect";
import BranchModel, {Branch} from './Branch'

@modelOptions({schemaOptions:{timestamps:true}})
export class Business{
    @prop({type:String, required:true, unique:true})
    name:string

    async getBranches(this:Business){
        await dbConnect()
        const docBranches = await BranchModel.find({businesses:this}).populate(Branch.getPopulateParameters())
        return docBranches
    }
}

export default getModelForClass(Business)