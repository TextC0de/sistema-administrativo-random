import UserController from 'backend/controllers/UserController'
import accessControl from 'backend/middleware/accessControl'
import { onError, onNoMatch } from 'backend/controllers/NextConnectController'
import nc from 'next-connect'

const protectedHandler = nc({ onError, onNoMatch })
protectedHandler.use(accessControl)

protectedHandler.put(UserController.generateNewPassword)

export default protectedHandler
