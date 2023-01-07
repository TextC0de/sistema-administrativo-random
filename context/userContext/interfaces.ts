import { Role } from "../../models/types";

export interface ReducedUser{
    email:string;
    firstName:string;
    lastName:string;
    role?:Role[]
    _id:string;
}