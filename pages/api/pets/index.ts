import dbConnect from '../../../lib/dbConnect'
import Pet from '../../../models/Pet'
import User from '../../../models/User'
import { NextApiRequest, NextApiResponse } from 'next'
import getUserServer from '../../../lib/getUserServerSide'
import Image from '../../../models/Image'
import { getAllPets } from '../../../lib/dbGetPets'




export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const { method, cookies } = req

  await dbConnect()


  switch (method) {
    case 'GET':
      try {
        const pets = await getAllPets()
         /* find all the data in our database */
        res.status(200).json({ success: true, data: pets })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const {username} = await getUserServer(req)
        const user = await User.findOne({username}) 
        const {name, species, age, poddy_trained, diet, likes, dislikes, imageId} = req.body.form
        const form = {name, species, age, poddy_trained, diet, likes, dislikes}
        const image = await Image.findById(imageId)
        console.log(image._id);
        
        //const image = req.body.image
        //const imageName = await uploadImage(image)
        const newPet = {...form, owner: user, owner_name: `${user.firstName} ${user.lastName}`, image}
        
        //add user to pet

        const pet = await Pet.create(newPet)/* create a new model in the database */
        //pet.image = image
        //pet.save()
        user.pets.push(pet)
        //console.log(user)
        user.save() /* saving the pet on the user */
        res.status(201).json({ success: true, data: pet })
      } catch (error) {
        console.log(error);
        
        res.status(400).json({ success: false, data:error })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
