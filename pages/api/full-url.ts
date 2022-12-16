import {NextApiRequest, NextApiResponse} from 'next'

//endpoint to get the full url, so any fetch made afterwards is properly pointed
export default async function handler(req:NextApiRequest, res:NextApiResponse){
    const fullUrl = req.headers.referer
    res.status(200).json({success:true, data:fullUrl})
}