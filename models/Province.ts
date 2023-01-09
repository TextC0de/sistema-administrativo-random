import mongoose from "mongoose";
import dbConnect from "../lib/dbConnect";
import City from "./City";
import { ICity, IProvince, IProvinceMethods, ProvinceModel } from "./interfaces";



const ProvinceSchema = new mongoose.Schema<IProvince, ProvinceModel, IProvinceMethods>({
    name:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true})

ProvinceSchema.methods.getCities = async function(this:IProvince):Promise<ICity[]>{
    await dbConnect()
    return await City.find({province:this._id})
}


export default mongoose.models.Province as ProvinceModel || mongoose.model<IProvince, ProvinceModel>('Province', ProvinceSchema)