import Image from '../models/Image'
import dbConnect from 'lib/dbConnect';
import { type NextConnectApiRequest } from './interfaces'
import { type ResponseData } from './types'
import { type NextApiResponse } from 'next'
import TaskModel, { Task } from '../models/Task';
import { DocumentType, getModelForClass } from '@typegoose/typegoose';


const ImageController = {
	postImage: async (req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) => {
		console.log("LLEGÓ A postController");
		console.log(req.body.image);
		
		await dbConnect()

		const {file} = req.body
		console.log("file en imageController:", file);
		
		// Obtén la clave "key" de la imagen que subiste a S3, probablemente la generaste en tu middleware
		const imageKey = file.key;

		console.log("imageKey en imageController",imageKey);
		
		// Construye la URL de acceso público a la imagen en S3
		const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${imageKey}`;

		const newImage = {
			name: file.originalname,
			url: imageUrl
		}

		const image = await Image.create(newImage)

		console.log("image en base de datos:", image);
		

		if (image == undefined) return res.status(500).json({ error: 'Could not create Image' })
		const taskId = req.query.taskId;
		const task = (await TaskModel.findOneUndeleted({ _id: taskId })) as DocumentType<Task>;

		if (task == null) return res.status(500).json({ error: 'Task not found' })
		task.image?.push(image._id);
		await task.save();

		res.status(200).json({ data: { imageId: image._id } })
	},

}

export default ImageController