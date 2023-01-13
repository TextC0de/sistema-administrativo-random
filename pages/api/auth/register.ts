
import baseHandler from 'backend/handlers/baseHandler'
import { register } from 'backend/controllers/AuthController'

baseHandler.post(register)

export default baseHandler

