import protectedHandler from 'backend/handlers/protectedHandler'
import AuthController from 'backend/controllers/AuthController'

protectedHandler.post(AuthController.changePassword)

export default protectedHandler
