import nc from 'next-connect';

import { onError, onNoMatch } from 'backend/controllers/NextConnectController';
import ProvinceController from 'backend/controllers/ProvinceController';
import accessControl from 'backend/middleware/accessControl';

const protectedHandler = nc({ onError, onNoMatch });
protectedHandler.use(accessControl);

protectedHandler.post(ProvinceController.postProvince);

protectedHandler.put(ProvinceController.putProvince);

protectedHandler.delete(ProvinceController.deleteProvince);

export default protectedHandler;
