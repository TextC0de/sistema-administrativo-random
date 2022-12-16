import mongoose from 'mongoose'

const ImageSchema = new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    url:{
        required:true,
        type:String,
        unique:true
    }
})

export default mongoose.models.Image || mongoose.model('Image', ImageSchema)