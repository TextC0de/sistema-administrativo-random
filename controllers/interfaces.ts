import { NextApiRequest } from 'next';
import { Role } from '../models/types';

export interface NextConnectApiRequest extends NextApiRequest {
    files: Express.Multer.File[];
}

export interface UserData{
    password:string,
    firstName:string,
    lastName:string,
    email:string,
    fullName?:string
    role:Role[]
  }
  