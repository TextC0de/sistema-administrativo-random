import {sign, UserIdJwtPayload, verify} from 'jsonwebtoken'
import { User } from 'backend/models/User'
const secret = process.env.SECRET || ''

export const getToken = (user:User) => {
    return sign({
      exp: Math.floor(Date.now() / 1000) + 60 *60 * 24 * 30, //30 days
      userId:user._id.toString(),
      userRoles:user.roles
    }, secret)
}

export const getPayload = (jwt:string) =>{
  return verify(jwt, secret)
}