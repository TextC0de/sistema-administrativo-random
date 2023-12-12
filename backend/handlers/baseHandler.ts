import nc from 'next-connect';

import { onError, onNoMatch } from '../controllers/NextConnectController';

const baseHandler = nc({ onError, onNoMatch });

export default baseHandler;
