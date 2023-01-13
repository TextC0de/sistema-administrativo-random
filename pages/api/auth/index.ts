
import baseHandler from 'backend/handlers/baseHandler'
import { login } from 'backend/controllers/AuthController'

baseHandler.post(login)

export default baseHandler
