import nc from 'next-connect';

import BusinessController from 'backend/controllers/BusinessController';
import { onError, onNoMatch } from 'backend/controllers/NextConnectController';
import accessControl from 'backend/middleware/accessControl';

const protectedHandler = nc({ onError, onNoMatch });
protectedHandler.use(accessControl);
protectedHandler.post(BusinessController.postBusiness);

protectedHandler.put(BusinessController.putBusiness);

protectedHandler.delete(BusinessController.deleteBusiness);

export default protectedHandler;
