import nc from 'next-connect';

import AuthController from 'backend/controllers/AuthController';
import { onError, onNoMatch } from 'backend/controllers/NextConnectController';
import accessControl from 'backend/middleware/accessControl';

const protectedHandler = nc({ onError, onNoMatch });
protectedHandler.use(accessControl);
protectedHandler.get(AuthController.logout);

export default protectedHandler;
