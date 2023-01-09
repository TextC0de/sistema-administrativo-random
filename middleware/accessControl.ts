
import { NextConnectApiRequest } from "../controllers/interfaces"
import { NextApiResponse } from "next"
import { ResponseData } from "../controllers/types"
import { UserIdJwtPayload } from "jsonwebtoken"
import { getPayload } from "../lib/jwt"
import User from "../models/User"

// with this middleware I want to check authorization, since authentication is achieved on login
// here I can verify the JWT and add it's payload to the request object
// if the verification fails I can just respond and not access sensible data in the database
// if the verification is succesful we just attach the payload to the request and let it pass to the endpoint, this could be the Id of the user accesing/sending data
// we could also verify the role of the user and set some data read/write permissions
// e.g. only a Tech Admin or a Technician should be able to create a Service
// e.g. only a Tech Admin should be able to create a city, province, client, branch or business
// e.g. only an Auditor should be able to change the status of a Service or Expense from Sent to Approved

const accessControl = async (req:NextConnectApiRequest, res:NextApiResponse<ResponseData>, next:any) => {
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
    req.userId = result.userId

    next()
}

export default accessControl