import mongoose from "mongoose";
import dbConnect from "../lib/dbConnect";
import Branch from "./Branch";
import { IClient, ClientModel, IClientMethods } from "./interfaces";



const ClientSchema = new mongoose.Schema<IClient, ClientModel, IClientMethods>({
    name:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true})

ClientSchema.methods.getBranches = async function(this:IClient) {
    await dbConnect()
    return await Branch.find({client:this._id})
}


export default mongoose.models.Client as ClientModel || mongoose.model<IClient, ClientModel>('Client', ClientSchema)