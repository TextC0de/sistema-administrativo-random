import { getModelForClass, prop, modelOptions } from "@typegoose/typegoose"
import mongoose from "mongoose"


@modelOptions({schemaOptions:{timestamps:true}})
export class Image{
    _id:mongoose.Types.ObjectId | string

    @prop({type:String, required:true})
    name:string
    
    @prop({type:String, required:true})
    url:string
}

export default getModelForClass(Image)