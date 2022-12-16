import { JwtPayload, UserNameJwtPayload, verify } from 'jsonwebtoken'
import { NextApiRequest } from 'next'
import { ReducedUser } from '../context/userContext/interfaces'
import User from '../models/User'
import dbConnect from './dbConnect'

const secret = process.env.SECRET || ''



/* import * as jwt from 'jsonwebtoken'

declare module 'jsonwebtoken' {
    export interface UserIDJwtPayload extends jwt.JwtPayload {
        userId: string
    }
}

export const userIdFromJWT = (jwtToken: string): string | undefined => {
    try {
        const { userId } = <jwt.UserIDJwtPayload>jwt.verify(jwtToken, process.env.JWT_COOKIE_SECRET || 'MISSING_SECRET')

        return userId
    } catch (error) {
        return undefined
    }
} */

//function for getting the user on GetServerSideProps

export default async function getUserServer(req:NextApiRequest): Promise<ReducedUser>{
    await dbConnect()
    const {cookies} = req
    let user:ReducedUser = {username:'', firstName: '', lastName:'', _id:''}
    if(cookies.access_token){
        const jwt = cookies.access_token
        const result = <UserNameJwtPayload>verify(jwt, secret)
        if(result){
            const username = result.username
            const {firstName, lastName, _id} = await User.findOne({username})
            user = {username, firstName, lastName, _id:_id.toString()}
            //console.log(user)
            return user
        }
        else return user
    }
    return user
}