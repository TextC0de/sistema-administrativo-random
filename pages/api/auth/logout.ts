import baseHandler from "../../../handlers/baseHandler";
import { logout } from '../../../controllers/AuthController';

baseHandler.get(logout)

export default baseHandler