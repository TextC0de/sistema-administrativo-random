import { NextApiResponse } from 'next'
import UserModel from '../models/User'
import { NextConnectApiRequest } from './interfaces'
import { ResponseData } from './types'
import Mailer from 'lib/nodemailer'
import { IUser } from '../models/interfaces'
import { formatIds } from 'lib/utils'
import dbConnect from 'lib/dbConnect'
import { nanoid } from 'nanoid'

const UserController = {
    getLoggedInUser: async (req:NextConnectApiRequest, res:NextApiResponse<ResponseData>) =>{
        //console.log('loggedInUser')        
        await dbConnect()
        try {
            const docUser = await UserModel.findById(req.userId)
            //console.log(docUser)
            if(!docUser) return res.json({error:'no user found', statusCode:402})
            res.status(200).json({data: {user:formatIds(docUser), message:'User found'}, statusCode:200})
        } catch (error) {
            console.log(error);
            
        }
    },
    getUser: async(req:NextConnectApiRequest, res:NextApiResponse<ResponseData>) =>{
        const {query: { id }} = req
        await dbConnect()
        const docUser = await UserModel.findById(id)
        if (!docUser) {
            return res.status(400).json({error:'User not found', statusCode:400})
        }
        const user = formatIds(docUser)
        res.status(200).json({data:{user, message:'User found'}, statusCode:200})
    },
    putUser: async(req:NextConnectApiRequest, res:NextApiResponse<ResponseData>) =>{
        const {body:{_id, firstName, lastName, city, roles, email}} = req
        await dbConnect()
        const docUser = await UserModel.findByIdAndUpdate(_id, {firstName, lastName, city, roles, email}, {
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
        const deletedUser = await UserModel.findOne({email})
        console.log("creando usuario")
        if(deletedUser){
            deletedUser.firstName = firstName
            deletedUser.lastName = lastName
            deletedUser.fullName = fullName
            deletedUser.city = city._id
            deletedUser.roles = roles
            deletedUser.password = password
            await deletedUser.restore()
            return res.status(200).json({data:{user:formatIds(deletedUser)}, statusCode:200})
        }
        try{
            const docUser = await UserModel.create(newUser)
            if (!docUser) return res.status(400).json({ error:'failed to create user', statusCode:400 })
            await Mailer.sendNewUserPassword(newUser)
            res.status(200).json({data:{user:formatIds(docUser)}, statusCode:200})
        }catch(e){
            console.log(e)
        }
  
    },
    deleteUser: async(req:NextConnectApiRequest, res:NextApiResponse<ResponseData>) => {
        const {body:{_id}} = req
        await dbConnect()
        const docUser = await UserModel.findById(_id)
        if(!docUser) return res.status(400).json({ error:'failed to delete user', statusCode:400 })
        await docUser.softDelete()
        res.status(200).json({data:{user:formatIds(docUser)}, statusCode:200})
    },
    generateNewPassword: async(req:NextConnectApiRequest, res:NextApiResponse<ResponseData>) => {
        //console.log('generateNewPassword endpoint')
        const {body:{_id}} = req
        await dbConnect()
        const docUser = await UserModel.findById(_id)
        const {firstName, lastName, fullName, city, roles, email} = formatIds(docUser)
        const password = nanoid(10)
        const newUser = {firstName, lastName, fullName, city, roles, email, password}
        const newDocUser = await UserModel.findByIdAndUpdate(_id, newUser, {
            new: true,
            runValidators: true,
          })
        if(!newDocUser) return res.status(400).json({ error:'failed to delete user', statusCode:400 })
        await Mailer.sendResetPassword(newUser)
        res.status(200).json({data:{user:formatIds(newDocUser)}, statusCode:200})
    },
    getTechs:async(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>)=>{
        await dbConnect()
        const techs = await UserModel.findUndeleted({roles:'Tecnico'})
        if(!techs) return res.json({statusCode:500, error:'no techs found'})
        res.json({data:{techs:formatIds(techs), message:'techs found'}, statusCode:200})
    }
}

export default UserController