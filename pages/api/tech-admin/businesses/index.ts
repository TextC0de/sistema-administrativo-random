import BusinessController from 'backend/controllers/BusinessController'
import accessControl from 'backend/middleware/accessControl'
import { onError, onNoMatch } from 'backend/controllers/NextConnectController'
import nc from 'next-connect'

const protectedHandler = nc({ onError, onNoMatch })
protectedHandler.use(accessControl)
protectedHandler.post(BusinessController.postBusiness)

protectedHandler.put(BusinessController.putBusiness)

protectedHandler.delete(BusinessController.deleteBusiness)

export default protectedHandler
