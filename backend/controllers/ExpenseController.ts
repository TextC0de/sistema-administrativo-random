import Expense from "backend/models/Expense"
import dbConnect from "lib/dbConnect"
import { NextApiResponse } from "next"
import { NextConnectApiRequest } from "./interfaces"
import { ResponseData } from "./types"


const ExpenseController = {
    postTech: async(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>)=>{
        const {body} = req
        await dbConnect()
        console.log(body)

    }
}

export default ExpenseController