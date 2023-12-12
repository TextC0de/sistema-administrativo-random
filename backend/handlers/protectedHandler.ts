import nc from 'next-connect';

import { onError, onNoMatch } from 'backend/controllers/NextConnectController';

import accessControl from '../middleware/accessControl';

const protectedHandler = nc({ onError, onNoMatch });
protectedHandler.use(accessControl);

export default protectedHandler;
