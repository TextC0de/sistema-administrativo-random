
import baseHandler from '../../../handlers/baseHandler'
import { login } from '../../../controllers/AuthController'

baseHandler.post(login)

export default baseHandler
