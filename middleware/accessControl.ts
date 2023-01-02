
import { NextConnectApiRequest } from "../controllers/interfaces"
import { NextApiResponse } from "next"
import { ResponseData } from "../controllers/types"

const accessControl = (req:NextConnectApiRequest, res:NextApiResponse<ResponseData>, next:any) => {
    
    
    next()
}

export default accessControl