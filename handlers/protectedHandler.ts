import accessControl from "../middleware/accessControl"
import nc from 'next-connect'
import { onError, onNoMatch } from "../controllers/NextConnectController";
import baseHandler from "./baseHandler";

const protectedHandler = () => baseHandler.use(accessControl);

export default protectedHandler()