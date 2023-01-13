import baseHandler from 'backend/handlers/baseHandler';
import { logout } from 'backend/controllers/AuthController';

baseHandler.get(logout)

export default baseHandler