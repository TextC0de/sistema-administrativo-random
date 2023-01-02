import { UserIdJwtPayload, verify } from "jsonwebtoken"
import { NextApiResponse } from "next"
import User from "../models/User"
import { NextConnectApiRequest } from "./interfaces"
import { ResponseData } from "./types"
import { ReducedUser } from "../context/userContext/interfaces"
import { userToReducedUser } from "../lib/user"
import { getPayload } from "../lib/jwt"

export const getLoggedInUser = async (req:NextConnectApiRequest, res:NextApiResponse<ResponseData>) =>{
    const {body, cookies} = req

    const jwt = /* appRequest? body.access_token : */cookies.access_token
    
    if(!jwt){
        //console.log('no user found logged in')
        res.status(403).json({error:`You're not logged in`, statusCode:403})
    }
    //console.log(jwt)
    let result = undefined
    if(jwt !== undefined){
        const result = <UserIdJwtPayload>(getPayload(jwt))//it's verified with the secret key
        if (!result){
            res.status(403).json({error:'No user found', statusCode:403})
        }
        if(result.userId){
            const user = await User.findById(result.userId)
            const reducedUser:ReducedUser = userToReducedUser(user)//console.log(user)
            //console.log(reducedUser);
            
            res.status(200).json({data: {user:reducedUser, message:'User found'}, statusCode:200})
        }
    }

    
    if(!result){
        //console.log('could not verify jwt')
        res.status(403).json({error:'Could not verify JWT', statusCode:403})
    }
}

export const getUser = async(req:NextConnectApiRequest, res:NextApiResponse<ResponseData>) =>{
    const {query: { id }} = req

    const user = await User.findById(id)
    if (!user) {
        return res.status(400).json({error:'User not found', statusCode:400})
    }
    const reducedUser = userToReducedUser(user)
    res.status(200).json({data:{user: reducedUser, message:'User found'}, statusCode:200})
}

export const putUser = async (req:NextConnectApiRequest, res:NextApiResponse<ResponseData>) =>{
    const {query: { id }} = req
    const user = await User.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      })
    if (!user) {
        return res.status(400).json({ error:'User not found', statusCode:400 })
    }

    const reducedUser = userToReducedUser(user)
    res.status(200).json({data:{user: reducedUser}, statusCode:200})

}