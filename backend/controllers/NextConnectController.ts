import { type NextConnectApiRequest } from './interfaces'
import { type NextApiResponse } from 'next'
import { type ResponseData } from './types'

export const onError = (error: any, req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) => {
    res.status(501).json({ error: `Sorry something Happened! ${error}` })
}

export const onNoMatch = (req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) => {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
}
