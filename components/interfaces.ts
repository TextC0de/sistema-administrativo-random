export interface PetFormInterface{
  name:string;
  species:string;
  age?:number;
  poddy_trained?:boolean;
  diet?:string[];
  imageId:string;
  likes?:string[];
  dislikes?:string[];
}