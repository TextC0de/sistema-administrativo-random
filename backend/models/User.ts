import { prop, Ref, getModelForClass, pre, modelOptions, ReturnModelType, DocumentType } from "@typegoose/typegoose";
import bcryptjs from 'bcryptjs'
import dbConnect from "lib/dbConnect";
import TaskModel, {Task} from "./Task";
import { ExpenseStatus, Role, TaskStatus } from "./types";
import ExpenseModel, {Expense} from './Expense'
import { IUserActivities } from "./interfaces";
import ActivityModel, {Activity} from "./Activity";
import mongoose from "mongoose";
import {City} from "./City";



@pre<User>('save', function(next:any){
    
    if(this.isModified('firstName') || this.isModified('lastName')){
      this.fullName = `${this.firstName} ${this.lastName}`
    }
    if(this.isModified('password') && this.password) {
      this.password = bcryptjs.hashSync(this.password, 10);
    }
    next()
})
@modelOptions({schemaOptions:{timestamps:true}})
export class User{
    
    _id:mongoose.Types.ObjectId | string

    @prop({type:String, required:true})
    firstName:string

    @prop({type:String, required:true})
    lastName:string

    @prop({type:String, required:true})
    fullName:string

    @prop({type:String, required:true, select:false})
    password:string

    @prop({type:String, required:true, unique:true})
    email:string

    @prop({ref:'City', required:false})
    city:Ref<City>

    @prop({type:mongoose.SchemaTypes.Array, required:true})
    roles:Role[]

    @prop({type:Boolean, default:false})
    deleted:boolean

    static getPopulateParameters(){
        getModelForClass(City)
        return [
            {
              path:'city',
              populate:City.getPopulateParameters()
            }
          ]
    }

    static async findUndeleted(this:ReturnModelType<typeof User>, filter:Object = {}){
        return await this.find({...filter, deleted:false}).populate(this.getPopulateParameters())
    }

    static async findOneUndeleted(this:ReturnModelType<typeof User>, filter:Object = {}){
        return this.findOne({...filter, deleted:false}).populate(this.getPopulateParameters())
    }
    
    async softDelete(this:DocumentType<User>){
        this.deleted = true
        await this.save()
    }

    async restore(this:DocumentType<User>){
        this.deleted = false
        await this.save()
    }

    comparePassword(this:User,plaintext:string):boolean {
        //console.log('trying to compare passwords');
        try {
          return bcryptjs.compareSync(plaintext, this.password)
        } catch (error) {
          console.log(error)
          return false
        }
    };

    async getTasks(this:User):Promise<Task[]> {
        return await TaskModel.findUndeleted({assigned:this})
    }
    
    async getTasksByStatus (this:User, status:TaskStatus):Promise<Task[]>{
        return await TaskModel.findUndeleted({assigned:this, status})
    }
    
    async getExpenses (this:User):Promise<Expense[]>{
        return await ExpenseModel.findUndeleted({doneBy:this})
    }
    
    async getExpensesByStatus (this:User, status:ExpenseStatus):Promise<Expense[]>{
        return await ExpenseModel.findUndeleted({doneBy:this, status})
    }
    
    async getActivities (this:User):Promise<IUserActivities> {
        const activities:Activity[] = await ActivityModel.findUndeleted()
        const userActivities = activities.filter(activity => activity.openedBy === this)
        const participantActivities = activities.filter(activity => activity.participants?.includes(this._id))
        return {userActivities, participantActivities}
    }
}



const UserModel = getModelForClass(User)

//UserModel.schema.path('roles', mongoose.SchemaTypes.Array)

export default UserModel