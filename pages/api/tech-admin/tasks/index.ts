import TaskController from 'backend/controllers/TaskController'
import accessControl from 'backend/middleware/accessControl'
import { onError, onNoMatch } from 'backend/controllers/NextConnectController'
import nc from 'next-connect'

const protectedHandler = nc({ onError, onNoMatch })
protectedHandler.use(accessControl)

protectedHandler.post(TaskController.postTask)
protectedHandler.put(TaskController.putTask)
protectedHandler.delete(TaskController.deleteTask)

export default protectedHandler
