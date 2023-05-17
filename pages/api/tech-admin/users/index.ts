
import protectedHandler from 'backend/handlers/protectedHandler'
import UserController from 'backend/controllers/UserController'

protectedHandler.get(UserController.getUser)
protectedHandler.put(UserController.putUser)
protectedHandler.post(UserController.postUser)
protectedHandler.delete(UserController.deleteUser)

export default protectedHandler
