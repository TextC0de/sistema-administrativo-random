import { JwtPayload, UserIdJwtPayload, verify } from 'jsonwebtoken'
import { NextApiRequest } from 'next'
import { ReducedUser } from '../context/userContext/interfaces'
import { IUser } from '../models/interfaces'
import User from '../models/User'
import dbConnect from './dbConnect'
import {formatIds} from './models'

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

export async function getUserServer(req:NextApiRequest): Promise<IUser|undefined> {
    await dbConnect()
    const {cookies} = req
    if(!cookies.access_token){
        return undefined
    }
    const jwt = cookies.access_token
    const result = <UserIdJwtPayload>verify(jwt, secret)
    if(!result){
        return undefined
    }
    const _id = result._id
    const rawUser = await User.findById(_id)
    if (!rawUser) {
        return undefined
    }
    const user = formatIds(rawUser)
    return user
}
