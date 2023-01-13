
import protectedHandler from '../auth/user'
import { getUser, putUser } from 'backend/controllers/UserController'

//endpoint for getting a user or updating a user
protectedHandler.get(getUser).put(putUser)