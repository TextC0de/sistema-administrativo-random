import User from '../../../models/User'
import { UserNameJwtPayload, verify } from 'jsonwebtoken'
import {UserInterface} from '../../../models/interfaces'
import {NextApiResponse, NextApiRequest}from 'next'


/* declare module 'jsonwebtoken'{
    export interface UserNameJwtPayload extends JwtPayload{
        username:string
    }
}
 */
//endpoint for getting the currently logged in user from db
export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const { cookies, body} = req
    const {appRequest} = body
    //console.log(method)
    try{
        const secret = process.env.SECRET || ''
        //console.log(secret)
        //console.log(cookies)
        const jwt = /* appRequest? body.access_token : */cookies.access_token
        
        if(jwt){
            //console.log(jwt)
            const result = <UserNameJwtPayload>verify(jwt, secret)//it's verified with the secret key
            //console.log(result)
            if (result){
                if(result.username){
                    const user:UserInterface|null = await User.findOne({username:result.username})
                    //console.log(user)
                    res.status(200).json({success:true, message:'found user', data: user})
                }
                else{
                    res.status(403).json({success:false, message:'no user logged in'})
                }
            }
            if(!result){
                //console.log('could not verify jwt')
                res.status(403).json({success:false, message:'could not verify jwt'})
            }
        }else{
            //console.log('no user found logged in')
            res.status(403).json({success:true, message:`you're not logged in`})
        }
    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false, message:error})
    }    
}