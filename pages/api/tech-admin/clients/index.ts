import nc from 'next-connect';

import ClientController from 'backend/controllers/ClientController';
import { onError, onNoMatch } from 'backend/controllers/NextConnectController';
import accessControl from 'backend/middleware/accessControl';

const protectedHandler = nc({ onError, onNoMatch });

protectedHandler.use(accessControl);

protectedHandler.post(ClientController.postClient);

protectedHandler.put(ClientController.putClient);

protectedHandler.delete(ClientController.deleteClient);

export default protectedHandler;
