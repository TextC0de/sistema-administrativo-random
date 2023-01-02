import nc from 'next-connect'
import { onError, onNoMatch } from '../controllers/NextConnectController';

const baseRoute = nc({onError,onNoMatch});

export default baseRoute