import { NextConnectApiRequest } from './interfaces';
import { NextApiResponse } from 'next';
import { ResponseData } from './types';

export const onError = (error:any, req: NextConnectApiRequest, res: NextApiResponse<ResponseData>)=> {    
    res.status(501).json({ error: `Sorry something Happened! ${error}` });
}

export const onNoMatch = (req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) => {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
}