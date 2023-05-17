import Image from '../models/Image'
import { uploadImage } from 'lib/googleStorage'
import { type NextConnectApiRequest } from './interfaces'
import { type ResponseData } from './types'
import { type NextApiResponse } from 'next'

const ImageController = {
	postImage: async (req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) => {
		const file = req.files[0]
		const newImage = {
			name: file.originalname,
			url: `https://storage.cloud.google.com/random-images-bucket/${file.originalname}?authuser=2`
		}
		const image = await Image.create(newImage)
		const { blobStream } = await uploadImage(file.originalname)

		blobStream.on('error', (err) => {
			res.status(500).json({ error: err as unknown as string })
		})
		blobStream.end(file.buffer)
		res.status(200).json({ data: { imageId: image._id } })
	}
}

export default ImageController
