import TaskController from 'backend/controllers/TaskController'
import accessControl from 'backend/middleware/accessControl'
import { onError, onNoMatch } from 'backend/controllers/NextConnectController'
import nc from 'next-connect'

const protectedHandler = nc({ onError, onNoMatch })
protectedHandler.use(accessControl)
protectedHandler.get(TaskController.getTechTasks)
protectedHandler.post(TaskController.postTechTask)
export default protectedHandler
