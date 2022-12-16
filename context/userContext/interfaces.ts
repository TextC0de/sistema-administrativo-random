import { UserInterface } from '../../models/interfaces'

export interface FullUrlJson {
    success:boolean;
    data:string;
}

export interface UserJson{
    success:boolean;
    data?: UserInterface;
    message: string;
}

export interface ReducedUser{
    username:string;
    firstName:string;
    lastName:string;
    _id:string;
}