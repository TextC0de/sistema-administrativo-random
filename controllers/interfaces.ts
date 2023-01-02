import { NextApiRequest } from 'next';

export interface NextConnectApiRequest extends NextApiRequest {
    files: Express.Multer.File[];
}

export interface UserData{
    password:string,
    firstName:string,
    lastName:string,
    email:string,
    fullName?:string
  }
  