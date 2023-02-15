import { Ref, prop, index, getModelForClass, modelOptions } from "@typegoose/typegoose"
import { Branch } from "./Branch"
import { PreventiveStatus, Frequency, Month } from "./types"
import {User} from "./User"
import { Business } from "./Business"
import { IPopulateParameter } from "./interfaces"
import mongoose from "mongoose"

@index({business:1, branch:1}, {unique:true})
@modelOptions({schemaOptions:{timestamps:true}})
export class Preventive {
    _id:mongoose.Types.ObjectId | string

    @prop({type:mongoose.SchemaTypes.Array, ref:'User', required:true})
    assigned:Ref<User>[]
    
    @prop({ref:'Business', required:true})
    business:Ref<Business>
    
    @prop({ref:'Branch', required:true})
    branch:Ref<Branch>
    
    @prop({type:String, required:true})
    status:PreventiveStatus
    
    @prop({type:Number, required:false})
    frequency?:Frequency
   
    @prop({type:mongoose.SchemaTypes.Array, required:false})
    months?:string[]
    
    @prop({type:Date, required:false})
    lastDoneAt?:Date
    
    @prop({type:Date, required:false})
    batteryChangedAt?:Date
    
    @prop({type:String, required:false})
    observations?:string

    static getPopulateParameters():IPopulateParameter[]{
        return[
            {
                path:'assigned',
                populate:User.getPopulateParameters()
            },
            {
                path:'business'
            },
            {
                path:'branch',
                populate:Branch.getPopulateParameters()
            }
        ]
    }
}

export default getModelForClass(Preventive)