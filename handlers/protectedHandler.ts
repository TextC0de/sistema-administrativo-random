import accessControl from "../middleware/accessControl"
import nc from 'next-connect'
import { onError, onNoMatch } from "../controllers/NextConnectController";

export const protectedHandler = nc({onError,onNoMatch}).use(accessControl);