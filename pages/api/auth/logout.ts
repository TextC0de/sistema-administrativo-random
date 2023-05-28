import AuthController from 'backend/controllers/AuthController'
import accessControl from 'backend/middleware/accessControl'
import { onError, onNoMatch } from 'backend/controllers/NextConnectController'
import nc from 'next-connect'

const protectedHandler = nc({ onError, onNoMatch })
protectedHandler.use(accessControl)
protectedHandler.get(AuthController.logout)

export default protectedHandler
