import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import Pet from '../../../models/Pet'
import Image from '../../../models/Image'
import { deleteImage } from '../../../lib/googleStorage'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const pet = await Pet.findById(id)
        if (!pet) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: pet })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const {name, species, age, poddy_trained, diet, imageId, likes, dislikes} = req.body
        const oldPet = await Pet.findById(id)
        if(oldPet.image.toString() !== imageId){//if the image is not the same, we delete it from storage and db
          const oldImage = await Image.findById(oldPet.image)
          await deleteImage(oldImage.name)
          await Image.findByIdAndDelete(oldPet.image)
        }
        const image = await Image.findById(imageId)
        const updatedPet = {name, species, age, poddy_trained, diet, likes, dislikes, image}
        const pet = await Pet.findByIdAndUpdate(id, updatedPet, {
          new: true,
          runValidators: true,
        })
        if (!pet) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: pet })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedPet = await Pet.deleteOne({ _id: id })
        if (!deletedPet) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
