import TaskController from 'backend/controllers/TaskController'
import protectedHandler from 'backend/handlers/protectedHandler'

protectedHandler.get(TaskController.getTechTasks)
protectedHandler.post(TaskController.postTechTask)
export default protectedHandler