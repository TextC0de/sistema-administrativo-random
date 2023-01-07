import mongoose from 'mongoose'
import { IImage, IImageMethods, ImageModel } from './interfaces'


export const ImageSchema = new mongoose.Schema<IImage, ImageModel, IImageMethods>({
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

export default mongoose.models.Image as ImageModel || mongoose.model<IImage, ImageModel>('Image', ImageSchema)