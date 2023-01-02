import { JwtPayload, UserIdJwtPayload, verify } from 'jsonwebtoken'
import { NextApiRequest } from 'next'
import { ReducedUser } from '../context/userContext/interfaces'
import { UserInterface } from '../models/interfaces'
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

export async function getUserServer(req:NextApiRequest): Promise<ReducedUser>{
    await dbConnect()
    const {cookies} = req
    let user:ReducedUser = {email:'', firstName: '', lastName:'', _id:''}
    if(cookies.access_token){
        const jwt = cookies.access_token
        const result = <UserIdJwtPayload>verify(jwt, secret)
        if(result){
            const _id = result._id
            const {firstName, lastName, email} = await User.findById(_id)
            user = {email, firstName, lastName, _id}
            //console.log(user)
            return user
        }
        else return user
    }
    return user
}

export function userToReducedUser(user:UserInterface): ReducedUser{
    return {email:user.email, firstName:user.firstName, lastName:user.lastName, _id:user._id.toString()}
}