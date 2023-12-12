import nc from 'next-connect';

import ActivityController from 'backend/controllers/ActivityController';
import { onError, onNoMatch } from 'backend/controllers/NextConnectController';
import accessControl from 'backend/middleware/accessControl';

const protectedHandler = nc({ onError, onNoMatch });
protectedHandler.use(accessControl);
protectedHandler.get(ActivityController.getTechActivities);

export default protectedHandler;
