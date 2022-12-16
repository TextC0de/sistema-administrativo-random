import dbConnect from '../../../lib/dbConnect'
import Pet from '../../../models/Pet'
import { UserNameJwtPayload, verify} from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const { method, cookies, body } = req
    const secret = process.env.SECRET || ''
    await dbConnect()
  
  
    switch (method) {
        case 'GET':
            try {
                const payload = <UserNameJwtPayload>verify(body.access_token, secret)
                const pets = await Pet.find({username: payload.username}) /* find all the data in our database */
                res.status(200).json({ success: true, data: pets })
            } catch (error) {
                console.log(error)
                res.status(400).json({ success: false, message:error })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}