import nc from 'next-connect';

import { onError, onNoMatch } from 'backend/controllers/NextConnectController';
import UserController from 'backend/controllers/UserController';
import accessControl from 'backend/middleware/accessControl';

const protectedHandler = nc({ onError, onNoMatch });
protectedHandler.use(accessControl);
// endpoint for getting the currently logged in user from db
protectedHandler.get(UserController.getLoggedInUser);

export default protectedHandler;
