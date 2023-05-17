import baseHandler from 'backend/handlers/baseHandler'
import AuthController from 'backend/controllers/AuthController'

baseHandler.post(AuthController.register)

export default baseHandler
