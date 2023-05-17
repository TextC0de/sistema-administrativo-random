import { type JwtPayload, sign, verify } from 'jsonwebtoken'
import { type User } from 'backend/models/User'
const secret = process.env.SECRET ?? ''

export const getToken = (user: User): string => {
    return sign({
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
      userId: user._id.toString(),
      userRoles: user.roles
    }, secret)
}

export const getPayload = (jwt: string): string | JwtPayload => {
  return verify(jwt, secret)
}
