import { type UserIdJwtPayload, verify } from 'jsonwebtoken'
import { type NextApiRequest } from 'next'
import { type IUser } from 'backend/models/interfaces'
import User from 'backend/models/User'
import dbConnect from './dbConnect'
import { formatIds } from './utils'

const secret = process.env.SECRET ?? ''

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

// function for getting the user on GetServerSideProps

export async function getUserServer(req: NextApiRequest): Promise<IUser | undefined> {
    await dbConnect()
    const { cookies } = req
    if (cookies.access_token === undefined) {
        return undefined
    }
    const jwt = cookies.access_token
    const result = <UserIdJwtPayload>verify(jwt, secret)
    if (result === undefined) {
        return undefined
    }
    const _id = result._id
    const docUser = await User.findById(_id)
    if (docUser === null) {
        return undefined
    }
    const user = formatIds(docUser)
    return user
}
