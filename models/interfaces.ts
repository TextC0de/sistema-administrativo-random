//Interfaces for every model

import {Types} from "mongoose";

export interface ImageInterface{
  _id:Types.ObjectId,
  name:string,
  url:string
}


export interface UserInterface {
  _id: Types.ObjectId;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName?: string;

}

export type SuccessfulResponse<T> = { data: T; error?: never; statusCode?: number };
export type UnsuccessfulResponse<E> = { data?: never; error: E; statusCode?: number };

export type ApiResponse<T, E = unknown> = SuccessfulResponse<T> | UnsuccessfulResponse<E>;