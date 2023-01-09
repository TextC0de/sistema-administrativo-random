import { NextConnectApiRequest} from './interfaces';
import { ResponseData} from './types';
import { NextApiResponse } from 'next';
import cookie from 'cookie'
import dbConnect from '../lib/dbConnect'
import User from '../models/User'
import { cookieOptionsLogin, cookieOptionsLogout } from '../lib/cookies';
import { getToken } from '../lib/jwt';
import { ReducedUser } from '../context/userContext/interfaces';
import { UserData } from './interfaces';

import { IUser } from '../models/interfaces';
import { formatIds } from '../lib/models';


export const login = async (req:NextConnectApiRequest, res:NextApiResponse<ResponseData>) =>{
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
      
      let user = await User.findOne({email}).select('+password')/* find user by email */
      //console.log(user)
      if(!user){
        return res.status(403).json({statusCode:403, error:'Wrong password/email'})
      }
      if(!user.comparePassword(password)){
        console.log('Wrong password/email')
        
        res.status(403).json({statusCode:403, error:'Wrong password/email'}) 
      } 
      console.log('returned info');
      const access_token = getToken(user)
      const reducedUser = formatIds(user)
      const data = {access_token, reducedUser}
      res.status(201).json({data, statusCode:201})
    }else{
      const {email, password} = req.body
      let user = await User.findOne({email}).select('+password')/* find user by email */
      if (!user){
        return res.status(403).json({statusCode:403, error:'Wrong password/email'})
      }
      const passwordMatch = user.comparePassword(password)
      if(!passwordMatch){
        res.status(403).json({statusCode:403, error:'Wrong password/email'}) 
      }
      res.setHeader('Set-Cookie', cookie.serialize(`access_token`, getToken(user), cookieOptionsLogin))
      res.status(201).json({statusCode:201, data:'succesful login'})
    }
}

export const logout = async(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) =>{
 
    res.setHeader('Set-Cookie', cookie.serialize(`access_token`, '', cookieOptionsLogout))
    res.status(201).json({ data:{message:'success'} })
}

export const register = async(req:NextConnectApiRequest, res:NextApiResponse<ResponseData>) =>{
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
}

