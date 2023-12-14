import { NextApiResponse } from 'next';

import { getPayload } from '@/lib/jwt';
import { NextConnectApiRequest } from 'backend/controllers/interfaces';

import { type Role } from '../models/types';

// with this middleware I want to check authorization, since authentication is achieved on login
// here I can verify the JWT and add it's payload to the request object
// if the verification fails I can just respond and not access sensible data in the database
// if the verification is succesful we just attach the payload to the request and let it pass to the endpoint, this could be the Id of the user accesing/sending data
// we could also verify the role of the user and set some data read/write permissions
// e.g. only a Tech Admin or a Technician should be able to create a Task
// e.g. only a Tech Admin should be able to create a city, province, client, branch or business
// e.g. only an Auditor should be able to change the status of a Task or Expense from Sent to Approved

const accessControl = async (
    req: NextConnectApiRequest,
    res: NextApiResponse,
    next: any,
): Promise<void> => {
    const { headers, cookies } = req;

    const jwt =
        headers.authorization !== undefined
            ? headers.authorization
            : cookies.ras_access_token;

    if (jwt === undefined)
        return res.status(401).json({ error: "You're not logged in", statusCode: 403 });
    const result = getPayload(jwt); // it's verified with the secret key

    if (result === undefined)
        return res.status(401).json({ error: 'No user found', statusCode: 403 });

    if (!isAuthorized(req.url as string, result.payload.userRoles as Role[])) {
        return res.status(401).json({
            error: "You're not authorized to access this resource",
            statusCode: 403,
        });
    }
    req.userId = result.payload.userId;

    next();
};

// takes a pathname and the user's list of roles, it checks that the user has the role the pathname is accessing
/*
switch for the role part of the pathname, it checks that the role is included in the roles of the user
*/
const isAuthorized = (pathname: string, roles: Role[]): boolean => {
    const rolePath = pathname.slice(5, pathname.indexOf('/', 5));
    if (rolePath === 'auth') return true;
    switch (rolePath) {
        case 'tech-admin':
            return roles.includes('Administrativo Tecnico');
        case 'acc-admin':
            return roles.includes('Administrativo Contable');
        case 'auditor':
            return roles.includes('Auditor');
        case 'tech':
            return roles.includes('Tecnico');
        default:
            return false;
    }
};

export default accessControl;
