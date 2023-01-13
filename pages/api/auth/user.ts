import protectedHandler from 'backend/handlers/protectedHandler'
import {getLoggedInUser} from 'backend/controllers/UserController'

//endpoint for getting the currently logged in user from db
protectedHandler.get(getLoggedInUser)

export default protectedHandler