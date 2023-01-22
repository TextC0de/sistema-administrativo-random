import protectedHandler from 'backend/handlers/protectedHandler'
import UserController from 'backend/controllers/UserController'

//endpoint for getting the currently logged in user from db
protectedHandler.get(UserController.getLoggedInUser)

export default protectedHandler