import mongoose from 'mongoose';
import Task from './Task'
import { IBusiness, BusinessModel, IBusinessMethods } from './interfaces';
import dbConnect from 'lib/dbConnect';


const BusinessSchema = new mongoose.Schema<IBusiness,BusinessModel, IBusinessMethods>({
    name:{
        type:String,
        required:true,
    }
},{timestamps:true})

BusinessSchema.methods.getTasks = async function(this:IBusiness){
    await dbConnect()
    return await Task.find({ business: this._id}) 

}


export default mongoose.models.Business as BusinessModel || mongoose.model<IBusiness,BusinessModel>('Business', BusinessSchema)