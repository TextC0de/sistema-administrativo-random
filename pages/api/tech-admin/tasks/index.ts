import TaskController from 'backend/controllers/TaskController';
import protectedHandler from 'backend/handlers/protectedHandler';


protectedHandler.post(TaskController.postTask)
protectedHandler.put(TaskController.putTask)
protectedHandler.delete(TaskController.deleteTask)

export default protectedHandler