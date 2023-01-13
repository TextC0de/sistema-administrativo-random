import mongoose from 'mongoose';
import dbConnect from 'lib/dbConnect';
import Branch from './Branch';
import { ICity, CityModel, ICityMethods } from './interfaces';
import Province from './Province';


const CitySchema = new mongoose.Schema<ICity, CityModel, ICityMethods>({
    name:{
        type:String,
        required:true,
        unique:true
    },
    province:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Province',
        required:true
    }

},{timestamps:true})

CitySchema.methods.getProvince = async function(this:ICity){
        await dbConnect()
        const docProvince = await Province.findById(this.province)
        return docProvince
    } 


CitySchema.methods.getBranches = async function(this:ICity){
        await dbConnect()
        return await Branch.find({city:this._id})
    } 

CitySchema.statics.populateParameter = function(){
    return [{path:'province'}]
}

export default mongoose.models.City as CityModel || mongoose.model<ICity, CityModel>('City', CitySchema)