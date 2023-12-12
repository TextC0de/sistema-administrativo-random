import nc from 'next-connect';

import CityController from 'backend/controllers/CityController';
import { onError, onNoMatch } from 'backend/controllers/NextConnectController';
import accessControl from 'backend/middleware/accessControl';

const protectedHandler = nc({ onError, onNoMatch });
protectedHandler.use(accessControl);

protectedHandler.post(CityController.postCity);

protectedHandler.put(CityController.putCity);

protectedHandler.delete(CityController.deleteCity);

export default protectedHandler;
