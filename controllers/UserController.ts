import { UserIdJwtPayload, verify } from "jsonwebtoken"
import { NextApiResponse } from "next"
import User from "../models/User"
import { NextConnectApiRequest } from "./interfaces"
import { ResponseData } from "./types"
import { ReducedUser } from "../context/userContext/interfaces"
import { getPayload } from "../lib/jwt"
import { IUser } from "../models/interfaces"
import { formatIds } from "../lib/models"

export const getLoggedInUser = async (req:NextConnectApiRequest, res:NextApiResponse<ResponseData>) =>{
    const {body, cookies} = req

    const jwt = /* appRequest? body.access_token : */cookies.access_token
    
    if(!jwt){
        //console.log('no user found logged in')
        return res.status(403).json({error:`You're not logged in`, statusCode:403})
    }
    //console.log(jwt)
    //if(jwt !== undefined){
    const result = <UserIdJwtPayload>(getPayload(jwt))//it's verified with the secret key
    if (!result){
        res.status(403).json({error:'No user found', statusCode:403})
    }
    const docUser = await User.findById(result.userId)
    const user:IUser = formatIds(docUser)//console.log(user)
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