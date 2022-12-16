import dbConnect from "./dbConnect"
import Pet from "../models/Pet"
import Image from "../models/Image"
import getUserServer from "./getUserServerSide"
import { NextApiRequest } from "next"

export const getAllPets = async()=>{
    await dbConnect()

  /* find all the pets in our database */
  const allPets = await Pet.find({})
  const pets = await Promise.all(
    allPets.map(async(doc) =>
    {
      const pet = doc.toObject()
      pet._id = pet._id.toString()
      pet.owner = pet.owner.toString()
      if(pet.image){
        //console.log(pet.image.toString())
        
        const petImage = await Image.findById(pet.image)
        pet.imageUrl = petImage.toObject().url
        pet.image = pet.image.toString()
      }
      
      return pet
    })
  )
  return pets
}

export const getUserPets = async(req:NextApiRequest)=>{
  await dbConnect()
  //console.log(`req in gssp in /mypets: ${req.headers.referer}`)
  let user = await getUserServer(req)
  //console.log(`user in gssp from /my-pets: ${JSON.stringify(user)}`)
  let pets = []
  if (user.username !== ''){
      //it's easier to query the pet collection with the owner id than querying it for every pet the owner has
      const userPets = await Pet.find({ owner: user._id}) 
      pets = await Promise.all(userPets.map(async(doc) => {
        const pet = doc.toObject()
        pet._id = pet._id.toString()
        pet.owner = pet.owner.toString()
        
        if(pet.image){
          console.log(pet.image.toString())
          const petImage = await Image.findById(pet.image)
          pet.imageUrl = petImage.toObject().url
          pet.image = pet.image.toString()
        }
        return pet
      }))
  }
  return pets
}

export const getPet = async(id:string) =>{
  await dbConnect()
  
  const pet = await Pet.findById(id).lean()
  pet._id = pet._id.toString()
  pet.owner = pet.owner.toString()
  if(pet.image){
    console.log(pet.image.toString())
    const petImage = await Image.findById(pet.image)
    pet.imageUrl = petImage.toObject().url
    pet.image = pet.image.toString()
  }
  return pet
}