import nc from 'next-connect';

import ExpenseController from 'backend/controllers/ExpenseController';
import { onError, onNoMatch } from 'backend/controllers/NextConnectController';
import accessControl from 'backend/middleware/accessControl';

const protectedHandler = nc({ onError, onNoMatch });
protectedHandler.use(accessControl);
protectedHandler.post(ExpenseController.postTech);

export default protectedHandler;
