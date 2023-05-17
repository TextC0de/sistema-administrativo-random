import { modelOptions, getModelForClass, index, prop, type Ref, type ReturnModelType, type DocumentType } from '@typegoose/typegoose'
import { Business } from './Business'
import { City } from './City'
import { Client } from './Client'
import TaskModel, { type Task } from './Task'
import mongoose, { type FilterQuery } from 'mongoose'
import { type IPopulateParameter } from './interfaces'

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

    static getPopulateParameters(): IPopulateParameter[] {
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

    static async findUndeleted(this: ReturnModelType<typeof Branch>, filter: FilterQuery<Branch> = {}): Promise<Branch[]> {
        return await this.find({ ...filter, deleted: false }).populate(this.getPopulateParameters())
    }

    static async findOneUndeleted(this: ReturnModelType<typeof Branch>, filter: FilterQuery<Branch> = {}): Promise<Branch | null> {
        return await this.findOne({ ...filter, deleted: false }).populate(this.getPopulateParameters())
    }

    async softDelete(this: DocumentType<Branch>): Promise<void> {
        this.deleted = true
        await this.save()
    }

    async restore(this: DocumentType<Branch>): Promise<void> {
        this.deleted = false
        await this.save()
    }

    async getTasks(this: Branch): Promise<Task[]> {
        return await TaskModel.findUndeleted({ branch: this })
    }
}

export default getModelForClass(Branch)
