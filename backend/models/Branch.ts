import { modelOptions, getModelForClass, index, prop, type Ref, type ReturnModelType, type DocumentType } from '@typegoose/typegoose'
import dbConnect from 'lib/dbConnect'
import { Business } from './Business'
import { City } from './City'
import { Client } from './Client'
import TaskModel, { type Task } from './Task'
import mongoose from 'mongoose'

@modelOptions({ schemaOptions: { timestamps: true } })
@index({ number: 1, client: 1 }, { unique: true })
export class Branch {
    _id: mongoose.Types.ObjectId | string

    @prop({ type: Number, required: true })
    number: number

    @prop({ ref: 'City', required: true })
    city: Ref<City>

    @prop({ ref: 'Client', required: true })
    client: Ref<Client>

    @prop({ type: mongoose.SchemaTypes.Array, ref: 'Business', required: true })
    businesses: Array<Ref<Business>>

    @prop({ type: Boolean, default: false })
    deleted: boolean

    static getPopulateParameters() {
        getModelForClass(City)
        getModelForClass(Client)
        getModelForClass(Business)
        return [
            {
                path: 'city',
                populate: City.getPopulateParameters()
            },
            {
                path: 'client'
            },
            {
                path: 'businesses'
            }
        ]
    }

    static async findUndeleted(this: ReturnModelType<typeof Branch>, filter: Object = {}) {
        return await this.find({ ...filter, deleted: false }).populate(this.getPopulateParameters())
    }

    static async findOneUndeleted(this: ReturnModelType<typeof Branch>, filter: Object = {}) {
        return await this.findOne({ ...filter, deleted: false }).populate(this.getPopulateParameters())
    }

    async softDelete(this: DocumentType<Branch>) {
        console.log('softdelete')

        this.deleted = true
        await this.save()
    }

    async restore(this: DocumentType<Branch>) {
        this.deleted = false
        await this.save()
    }

    async getTasks(this: Branch): Promise<Task[]> {
        return await TaskModel.findUndeleted({ branch: this })
    }
}

export default getModelForClass(Branch)
