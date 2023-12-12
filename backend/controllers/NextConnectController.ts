import { type NextApiResponse } from 'next';

import { type NextConnectApiRequest } from './interfaces';
import { type ResponseData } from './types';

export const onError = (
    error: any,
    req: NextConnectApiRequest,
    res: NextApiResponse<ResponseData>,
): void => {
    res.status(501).json({ error: `Sorry something Happened! ${error as string}` });
};

export const onNoMatch = (
    req: NextConnectApiRequest,
    res: NextApiResponse<ResponseData>,
): void => {
    res.status(405).json({ error: `Method '${req.method as string}' Not Allowed` });
};
