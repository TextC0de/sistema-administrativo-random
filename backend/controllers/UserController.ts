import { NextApiResponse } from 'next'
import User from '../models/User'
import { NextConnectApiRequest } from './interfaces'
import { ResponseData } from './types'
import Mailer from 'lib/nodemailer'
import { IUser } from '../models/interfaces'
import { formatIds } from 'lib/utils'
import dbConnect from 'lib/dbConnect'
import { nanoid } from 'nanoid'

const UserController = {
    getLoggedInUser: async (req:NextConnectApiRequest, res:NextApiResponse<ResponseData>) =>{
        await dbConnect()
        const docUser = await User.findById(req.userId)
        if(!docUser) return res.json({error:'no user found', statusCode:402})
        res.status(200).json({data: {user:formatIds(docUser), message:'User found'}, statusCode:200})
    },
    getUser: async(req:NextConnectApiRequest, res:NextApiResponse<ResponseData>) =>{
        const {query: { id }} = req
        await dbConnect()
        const docUser = await User.findById(id)
        if (!docUser) {
            return res.status(400).json({error:'User not found', statusCode:400})
        }
        const user = formatIds(docUser)
        res.status(200).json({data:{user, message:'User found'}, statusCode:200})
    },
    putUser: async(req:NextConnectApiRequest, res:NextApiResponse<ResponseData>) =>{
        const {body:{_id, firstName, lastName, city, roles, email}} = req
        await dbConnect()
        const docUser = await User.findByIdAndUpdate(_id, {firstName, lastName, city, roles, email}, {
            new: true,
            runValidators: true,
          })
        if (!docUser) return res.status(400).json({ error:'failed to update user', statusCode:400 })
        res.status(200).json({data:{user:formatIds(docUser)}, statusCode:200})
    },
    postUser: async(req:NextConnectApiRequest, res:NextApiResponse<ResponseData>) => {
        const {body:{firstName, lastName, city, roles, email}} = req
        const password = nanoid(10)
        const fullName = `${firstName} ${lastName}`
        const newUser = {firstName, lastName, fullName, city, roles, email, password}
        await dbConnect()
        const docUser = await User.create(newUser)
        if (!docUser) return res.status(400).json({ error:'failed to create user', statusCode:400 })
        await Mailer.sendNewUserPassword(newUser)
        res.status(200).json({data:{user:formatIds(docUser)}, statusCode:200})
    },
    deleteUser: async(req:NextConnectApiRequest, res:NextApiResponse<ResponseData>) => {
        const {body:{_id}} = req
        await dbConnect()
        const docUser = await User.findByIdAndDelete(_id)
        if(!docUser) return res.status(400).json({ error:'failed to delete user', statusCode:400 })
        res.status(200).json({data:{user:formatIds(docUser)}, statusCode:200})
    },
    generateNewPassword: async(req:NextConnectApiRequest, res:NextApiResponse<ResponseData>) => {
        console.log('generateNewPassword endpoint')
        const {body:{_id}} = req
        await dbConnect()
        const docUser = await User.findById(_id)
        const {firstName, lastName, fullName, city, roles, email} = formatIds(docUser)
        const password = nanoid(10)
        const newUser = {firstName, lastName, fullName, city, roles, email, password}
        const newDocUser = await User.findByIdAndUpdate(_id, newUser, {
            new: true,
            runValidators: true,
          })
        if(!newDocUser) return res.status(400).json({ error:'failed to delete user', statusCode:400 })
        await Mailer.sendNewPassword(newUser)
        res.status(200).json({data:{user:formatIds(newDocUser)}, statusCode:200})
    }
}

export default UserController