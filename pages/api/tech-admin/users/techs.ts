import protectedHandler from 'backend/handlers/protectedHandler'
import UserController from 'backend/controllers/UserController'

protectedHandler.get(UserController.getTechs)

export default protectedHandler