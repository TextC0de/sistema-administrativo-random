import { prop, Ref, getModelForClass, pre, modelOptions } from "@typegoose/typegoose";
import bcryptjs from 'bcryptjs'
import dbConnect from "lib/dbConnect";
import TaskModel, {Task} from "./Task";
import { ExpenseStatus, Role, TaskStatus } from "./types";
import ExpenseModel, {Expense} from './Expense'
import { IUserActivities } from "./interfaces";
import ActivityModel, {Activity} from "./Activity";
import mongoose from "mongoose";
import {City} from "./City";
import {Types} from 'mongoose'

@pre<User>('save', function(next){
    
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
    @prop({type:Types.ObjectId, default:new mongoose.Types.ObjectId()})
    _id:Types.ObjectId

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

    @prop({type:String, required:true})
    roles:Role[]

    static getPopulateParameters(){
        return [
            {
              path:'city',
              populate:City.getPopulateParameters()
            }
          ]
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
        await dbConnect()
        return await TaskModel.find({assigned:this}).populate(Task.getPopulateParameters())
    }
    
    async getTasksByStatus (this:User, status:TaskStatus):Promise<Task[]>{
        await dbConnect()
        return await TaskModel.find({assigned:this, status})
    }
    
    async getExpenses (this:User):Promise<Expense[]>{
        await dbConnect()
        return await ExpenseModel.find({doneBy:this}).populate(Expense.getPopulateParameters())
    }
    
    async getExpensesByStatus (this:User, status:ExpenseStatus):Promise<Expense[]>{
        await dbConnect()
        return await ExpenseModel.find({doneBy:this, status}).populate(Expense.getPopulateParameters())
    }
    
    async getActivities (this:User):Promise<IUserActivities> {
        await dbConnect()
        const activities:Activity[] = await ActivityModel.find().populate(Activity.getPopulateParameters())
        const userActivities = activities.filter(activity => activity.openedBy === this)
        const participantActivities = activities.filter(activity => activity.participants?.includes(this._id))
        return {userActivities, participantActivities}
    }
}

const UserModel = getModelForClass(User)

export default UserModel