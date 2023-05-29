import AuthController from 'backend/controllers/AuthController'
import { onError, onNoMatch } from 'backend/controllers/NextConnectController'
import nc from 'next-connect'

const handler = nc({ onError, onNoMatch })
handler.post(AuthController.login)

export default handler
