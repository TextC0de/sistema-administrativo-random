import baseHandler from 'backend/handlers/baseHandler'
import AuthController from 'backend/controllers/AuthController'

baseHandler.post(AuthController.login)

export default baseHandler
