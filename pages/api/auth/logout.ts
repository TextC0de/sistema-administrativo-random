import baseHandler from 'backend/handlers/baseHandler';
import AuthController from 'backend/controllers/AuthController';

baseHandler.get(AuthController.logout)

export default baseHandler