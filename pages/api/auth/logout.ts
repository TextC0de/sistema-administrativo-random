import protectedHandler from 'backend/handlers/protectedHandler'
import AuthController from 'backend/controllers/AuthController'

protectedHandler.get(AuthController.logout)

export default protectedHandler
