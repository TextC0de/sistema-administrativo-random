import { getModelForClass, prop, modelOptions } from "@typegoose/typegoose"


@modelOptions({schemaOptions:{timestamps:true}})
export class Image{
    
    @prop({type:String, required:true})
    name:string
    
    @prop({type:String, required:true})
    url:string
}

export default getModelForClass(Image)