import Activity from 'backend/models/Activity'
import User from 'backend/models/User'
import dbConnect from 'lib/dbConnect'
import { formatIds } from 'lib/utils'
import { type NextApiResponse } from 'next'
import { type NextConnectApiRequest } from './interfaces'
import { type ResponseData } from './types'

const ActivityController = {
    getActivities: async(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) => {
        await dbConnect()
        const docActivities = Activity.find({})
        res.json({ data: { activities: formatIds(docActivities) }, statusCode: 200 })
    },
    getTechActivities: async(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) => {
        const { userId } = req
        await dbConnect()
        const docUser = await User.findById(userId)
        if (docUser == null) return res.json({ error: 'no user logged in', statusCode: 403 })
        const docActivities = docUser.getActivities()
        res.json({ data: { activities: formatIds(docActivities) }, statusCode: 200 })
    }
}

export default ActivityController
