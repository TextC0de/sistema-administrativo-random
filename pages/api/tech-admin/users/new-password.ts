import nc from 'next-connect';

import { onError, onNoMatch } from 'backend/controllers/NextConnectController';
import UserController from 'backend/controllers/UserController';
import accessControl from 'backend/middleware/accessControl';

const protectedHandler = nc({ onError, onNoMatch });
protectedHandler.use(accessControl);

protectedHandler.put(UserController.generateNewPassword);

export default protectedHandler;
