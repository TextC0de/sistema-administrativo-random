import { NextConnectApiRequest} from './interfaces';
import { ResponseData} from './types';
import { NextApiResponse } from 'next';
import cookie from 'cookie'
import dbConnect from 'lib/dbConnect'
import User from '../models/User'
import { cookieOptionsLogin, cookieOptionsLogout } from 'lib/cookies';
import { getToken } from 'lib/jwt';

import { UserData } from './interfaces';

import { IUser } from '../models/interfaces';
import { formatIds } from 'lib/utils';


const AuthController = {
  login:async (req:NextConnectApiRequest, res:NextApiResponse<ResponseData>) =>{
    /* let appRequest = false
    let parsedBody
    try {
      parsedBody = JSON.parse(req.body)
      appRequest = parsedBody.appRequest
    } catch (error) {
      console.log(error)
    }
    console.log(appRequest); */
    await dbConnect()

    if(req.body.appRequest){
      const {email, password} = req.body
      //console.log('mobileauth');
      
      let docUser = await User.findOne({email}).select('+password')/* find user by email */
      //console.log(docUser)
      if(!docUser) return res.status(403).json({statusCode:403, error:'Wrong password/email'})
      if(!docUser.comparePassword(password))return res.status(403).json({statusCode:403, error:'Wrong password/email'})  
      //console.log('returned info');
      const access_token = getToken(docUser)
      const {_id, firstName, lastName, fullName, roles} = docUser
      const user = formatIds({_id, email, firstName, lastName, fullName, roles})
      const data = {user, access_token}
      res.status(201).json({data, statusCode:201})
    }else{
      const {email, password} = req.body
      let user = await User.findOne({email}).select('+password')/* find user by email */
      if (!user) return res.status(403).json({statusCode:403, error:'Wrong password/email'})
      const passwordMatch = user.comparePassword(password)
      if(!passwordMatch) return res.status(403).json({statusCode:403, error:'Wrong password/email'}) 
      res.setHeader('Set-Cookie', cookie.serialize(`access_token`, getToken(user), cookieOptionsLogin))
      res.status(201).json({statusCode:201, data:'succesful login'})
    }
  },
  logout: async(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) =>{
  
    res.setHeader('Set-Cookie', cookie.serialize(`access_token`, '', cookieOptionsLogout))
    res.status(201).json({ data:{message:'success'} })
  },
  register: async(req:NextConnectApiRequest, res:NextApiResponse<ResponseData>) =>{
    const {password, firstName, lastName, email} = req.body
    const userData:UserData =  {password, firstName, lastName, email, role:['Administrativo Tecnico']}
    
    userData.fullName = `${firstName} ${lastName}`
    await dbConnect()
    /* create a new model in the database */
    try {
      const user = await User.create(userData)            
      const reducedUser:IUser = formatIds(user)
      res.status(201).json({data:{user:reducedUser},statusCode:201})
    } catch (error) {
      console.log(error);
      res.status(500).json({error:'failed to create user', statusCode:500})
    }
  },
  checkPassword:async (req:NextConnectApiRequest, res:NextApiResponse<ResponseData>) =>{
    const {body:{currentPassword}, userId} = req
    console.log(currentPassword);
    
    const user = await User.findById(userId).select('+password')
    if(!user) return res.status(403).json({error:'no user found', statusCode:403})
    const passwordMatch = user.comparePassword(currentPassword)
    if(!passwordMatch) return res.status(403).json({statusCode:403, error:'Wrong password'})
    return res.status(200).json({statusCode:200, data:{message:'Correct password'}})
  },
  changePassword:async (req:NextConnectApiRequest, res:NextApiResponse<ResponseData>) =>{
    const {body:{currentPassword, newPassword}, userId} = req
    const user = await User.findById(userId).select('+password')
    if(!user) return res.status(403).json({error:'no user found', statusCode:403})
    if(!user.comparePassword(currentPassword)) return res.status(403).json({statusCode:403, error:'Wrong password'})
    user.password = newPassword
    await user.save()
    return res.status(200).json({statusCode:200, data:{message:'Correct password'}})
  },
}

export default AuthController
