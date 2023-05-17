import { type NextApiRequest } from 'next'
import { type Role } from '../models/types'

export interface NextConnectApiRequest extends NextApiRequest {
	files: Express.Multer.File[]
	userId: string
}

export interface UserData {
	password: string
	firstName: string
	lastName: string
	email: string
	fullName?: string
	role: Role[]
}
