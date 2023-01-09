import protectedHandler from '../../../handlers/protectedHandler'
import {getLoggedInUser} from '../../../controllers/UserController'

//endpoint for getting the currently logged in user from db
protectedHandler.get(getLoggedInUser)

export default protectedHandler