import BusinessController from 'backend/controllers/BusinessController'
import protectedHandler from 'backend/handlers/protectedHandler'

protectedHandler.post(BusinessController.post)

protectedHandler.put(BusinessController.put)

protectedHandler.delete(BusinessController.delete)

protectedHandler.get(BusinessController.get)


export default protectedHandler