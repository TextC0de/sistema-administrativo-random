import { modelOptions, getModelForClass, index, prop, Ref } from "@typegoose/typegoose"
import dbConnect from "lib/dbConnect"
import { Business } from "./Business"
import { City } from "./City"
import { Client } from "./Client"
import TaskModel, { Task } from "./Task"
import mongoose from "mongoose"

@index({number:1,client:1 },{unique:true})
@modelOptions({schemaOptions:{timestamps:true}})
export class Branch{
    @prop({type:Number, required:true})
    number:number
    
    @prop({ref:'City', required:true})
    city:Ref<City>

    @prop({ref:'Client', required:true})
    client:Ref<Client>
    
    @prop({type:mongoose.SchemaTypes.Array, ref:'Business', required:true})
    businesses:Ref<Business>[]


    static getPopulateParameters(){

        return [
            {
                path:'city', 
                populate:City.getPopulateParameters()
            },
            {
                path:'client'
            },
            {
                path:'businesses'
            }
        ]
    }
    
    async getTasks(this:Branch):Promise<Task[]>{
        await dbConnect()
        return TaskModel.find({branch:this}).populate(Task.getPopulateParameters())
    }


}

export default getModelForClass(Branch)