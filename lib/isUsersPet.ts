import { ReducedUser } from "../context/userContext/interfaces";
import { PetInterface } from "../models/interfaces";


export default function isUsersPet(user:ReducedUser, pet:PetInterface){
    return user._id === pet.owner.toString()
}