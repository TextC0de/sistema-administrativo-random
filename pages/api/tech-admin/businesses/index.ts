import BusinessController from 'backend/controllers/BusinessController'
import protectedHandler from 'backend/handlers/protectedHandler'

protectedHandler.post(BusinessController.postBusiness)

protectedHandler.put(BusinessController.putBusiness)

protectedHandler.delete(BusinessController.deleteBusiness)

export default protectedHandler