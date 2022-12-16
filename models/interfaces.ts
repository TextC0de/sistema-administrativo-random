//Interfaces for every model

import {Types} from "mongoose";

export interface ImageInterface{
  _id:Types.ObjectId,
  name:string,
  url:string
}

export interface PetInterface{
  _id: Types.ObjectId;
  name: string;
  owner: UserInterface;
  owner_name: string;
  species: string;
  age: number;
  poddy_trained: boolean;
  diet: string[];
  image: ImageInterface;
  likes: string[];
  dislikes: string[];
  imageUrl?:string;
}
  

export interface UserInterface {
  _id: Types.ObjectId;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  pets?: PetInterface[];
}

export type SuccessfulResponse<T> = { data: T; error?: never; statusCode?: number };
export type UnsuccessfulResponse<E> = { data?: never; error: E; statusCode?: number };

export type ApiResponse<T, E = unknown> = SuccessfulResponse<T> | UnsuccessfulResponse<E>;