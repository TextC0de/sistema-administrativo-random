
import baseHandler from '../../../handlers/baseHandler'
import { register } from '../../../controllers/AuthController'

baseHandler.post(register)

export default baseHandler

