import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'

interface UserData{
  username:string,
  password:string,
  firstName:string,
  lastName:string,
  email:string,
  fullName?:string
}

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'POST':
      try {        
        const {username, password, firstName, lastName, email} = req.body
        const userData:UserData =  {username, password, firstName, lastName, email}
        
        userData.fullName = `${firstName} ${lastName}`
        /* create a new model in the database */
        const user = await User.create(
          userData
        )        
        res.status(201).json({ success: true, data: user })
      } catch (error) {
        console.log(error)
        res.status(401).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
