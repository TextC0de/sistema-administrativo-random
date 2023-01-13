import { NextApiResponse } from 'next'
import User from '../models/User'
import { NextConnectApiRequest } from './interfaces'
import { ResponseData } from './types'

import { IUser } from '../models/interfaces'
import { formatIds } from 'lib/utils'

export const getLoggedInUser = async (req:NextConnectApiRequest, res:NextApiResponse<ResponseData>) =>{
    console.log('logged in user');
    console.log('userId: ', req.userId );
  
    
    const docUser = await User.findById(req.userId)
    //const docUser = false
    //console.log('user found');
    //console.log(docUser)
    if(!docUser) return res.json({error:'no user found', statusCode:402})
    const user:IUser = formatIds(docUser)

    //console.log(user)
    //console.log(reducedUser);
    
    res.status(200).json({data: {user, message:'User found'}, statusCode:200})
}

export const getUser = async(req:NextConnectApiRequest, res:NextApiResponse<ResponseData>) =>{
    const {query: { id }} = req

    const docUser = await User.findById(id)
    if (!docUser) {
        return res.status(400).json({error:'User not found', statusCode:400})
    }
    const user = formatIds(docUser)
    res.status(200).json({data:{user, message:'User found'}, statusCode:200})
}

export const putUser = async (req:NextConnectApiRequest, res:NextApiResponse<ResponseData>) =>{
    const {query: { id }} = req
    const docUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      })
    if (!docUser) {
        return res.status(400).json({ error:'User not found', statusCode:400 })
    }

    const user = formatIds(docUser)
    res.status(200).json({data:{user}, statusCode:200})

}