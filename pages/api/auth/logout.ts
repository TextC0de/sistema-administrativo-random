import dbConnect from '../../../lib/dbConnect'
import cookie from 'cookie'
import { CookieSerializeOptions } from 'next/dist/server/web/types'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const { method } = req

  const cookieOptions:CookieSerializeOptions = {
    httpOnly:true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    expires: new Date(0), //0 days, it expires the cookei
    path:'/'
  }

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        if(req.body.appRequest){//since we don't hold the jwt in a cookie, we don't need the backend to do anything special
          res.status(201).json({ success: true, message: 'success' })
        }
        res.setHeader('Set-Cookie', cookie.serialize(`access_token`, '', cookieOptions))
        res.status(201).json({ success: true, message: 'success' })
      } catch (error) {
        
        console.log(error)
        res.status(500).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}