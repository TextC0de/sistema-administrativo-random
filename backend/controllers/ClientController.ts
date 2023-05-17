import { type NextApiResponse } from 'next'
import dbConnect from 'lib/dbConnect'
import { formatIds } from 'lib/utils'
import Client from '../models/Client'
import { type NextConnectApiRequest } from './interfaces'
import { type ResponseData } from './types'

const ClientController = {
    putClient: async(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) => {
        const { body: { _id, name } } = req

        await dbConnect()
        const clientForm = { name }
        const newClient = await Client.findByIdAndUpdate(_id, clientForm, {
            new: true,
            runValidators: true
          }
        )
        if (newClient == null) return res.json({ statusCode: 500, error: 'could not update Client' })
        const client = formatIds(newClient)
        res.json({ data: { client, message: 'updated Client succesfully' } })
    },
    postClient: async(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) => {
        const { body: { name } } = req
        await dbConnect()
        const clientForm = { name }
        const deletedClient = await Client.findOne({ name })
        if (deletedClient != null) {
            await deletedClient.restore()
            return res.json({ data: { deletedClient, message: 'created Client succesfully' } })
        }
        const newClient = await Client.create(clientForm)
        if (newClient === undefined) return res.json({ statusCode: 500, error: 'could not create Client' })

        const client = formatIds(newClient)
        res.json({ data: { client, message: 'created Client succesfully' } })
    },
    deleteClient: async(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) => {
        const { body: _id } = req
        await dbConnect()
        const deletedClient = await Client.findById(_id)
        if (deletedClient == null) return res.json({ statusCode: 500, error: 'could not delete Client' })
        await deletedClient.softDelete()
        res.json({ data: { message: 'deleted Client succesfully' } })
    }
}

export default ClientController
