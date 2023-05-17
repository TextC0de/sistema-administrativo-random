import PreventiveController from 'backend/controllers/PreventiveController'
import protectedHandler from 'backend/handlers/protectedHandler'

protectedHandler.post(PreventiveController.postPreventive)

protectedHandler.put(PreventiveController.putPreventive)

protectedHandler.delete(PreventiveController.deletePreventive)

export default protectedHandler
