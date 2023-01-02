//Interfaces for every model

import {Types} from "mongoose";

export interface ImageInterface{
  _id:Types.ObjectId,
  name:string,
  url:string
}


export interface UserInterface {
  _id: Types.ObjectId;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName?: string;
}

