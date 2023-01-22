import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'
import { IActivity, IExpense, UserModel, ITask, IUser, IUserActivities, IUserMethods } from './interfaces'
import dbConnect from 'lib/dbConnect'
import Task from './Task'
import { ExpenseStatus, TaskStatus } from './types'
import Expense from './Expense'
import Activity from './Activity'
import City from './City'




/* UserSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
  password:{
    type:String,
    required:true,
    select:false
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  firstName:{
    type:String,
    required:true
  },
  lastName:{
    type:String,
    required:true
  },
  fullName:{
    type:String
  },
  roles:[{
    type:String,
  }],
  city:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'City',
  }
}, {timestamps:true})

UserSchema.pre('save', function(next){
    
    if(this.isModified('firstName') || this.isModified('lastName')){
      this.fullName = `${this.firstName} ${this.lastName}`
    }
    if(this.isModified('password') && this.password) {
      this.password = bcryptjs.hashSync(this.password, 10);
    }
    next()
})

UserSchema.statics.populateParameter = function(){
  return [
    {
      path:'city',
      populate:City.populateParameter()
    }
  ]
}

UserSchema.methods.comparePassword = function(plaintext:string):boolean {
  //console.log('trying to compare passwords');
  try {
    return bcryptjs.compareSync(plaintext, this.password)
  } catch (error) {
    console.log(error)
    return false
  }
};


UserSchema.methods.getTasks = async function(this:IUser):Promise<ITask[]> {
  await dbConnect()
  return await Task.find({assigned:this._id})
}

UserSchema.methods.getTasksByStatus = async function (this:IUser, status:TaskStatus):Promise<ITask[]>{
  await dbConnect()
  return await Task.find({assigned:this._id, status})
}

UserSchema.methods.getExpenses = async function (this:IUser):Promise<IExpense[]>{
  await dbConnect()
  return await Expense.find({doneBy:this._id})
}

UserSchema.methods.getExpensesByStatus = async function (this:IUser, status:ExpenseStatus):Promise<IExpense[]>{
  await dbConnect()
  return await Expense.find({doneBy:this._id, status})
}

UserSchema.methods.getActivities = async function (this:IUser):Promise<IUserActivities> {
  await dbConnect()
  const activities:IActivity[] = await Activity.find()
  const userActivities = activities.filter(activity => activity.openedBy === this)
  const participantActivities = activities.filter(activity => activity.participants?.includes(this))
  return {userActivities, participantActivities}
}
export default mongoose.models.User as UserModel ||  mongoose.model<IUser, UserModel>('User', UserSchema)
