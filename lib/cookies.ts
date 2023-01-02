import { CookieSerializeOptions } from "next/dist/server/web/types"

export const cookieOptionsLogin:CookieSerializeOptions = {
    httpOnly:true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 60*60*24*30, //30 days
    path:'/'
}

export const cookieOptionsLogout:CookieSerializeOptions = {
    httpOnly:true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    expires: new Date(0), //0 days, it expires the cookei
    path:'/'
}