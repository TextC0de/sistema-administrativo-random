import dbConnect from 'lib/dbConnect'
import { type NextApiResponse } from 'next'
import { type NextConnectApiRequest } from './interfaces'
import { type ResponseData } from './types'

const ExpenseController = {
	postTech: async (req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) => {
		const { body } = req
		await dbConnect()
		console.log(body)
	}
}

export default ExpenseController
