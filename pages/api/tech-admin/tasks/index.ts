import nc from 'next-connect';

import { onError, onNoMatch } from 'backend/controllers/NextConnectController';
import TaskController from 'backend/controllers/TaskController';
import accessControl from 'backend/middleware/accessControl';

const protectedHandler = nc({ onError, onNoMatch });
protectedHandler.use(accessControl);

protectedHandler.post(TaskController.postTask);
protectedHandler.put(TaskController.putTask);
protectedHandler.delete(TaskController.deleteTask);

export default protectedHandler;
