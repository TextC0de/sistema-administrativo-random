
import protectedHandler from '../auth/user'
import { getUser, putUser } from '../../../controllers/UserController'

//endpoint for getting a user or updating a user
protectedHandler.get(getUser).put(putUser)