import ClientController from 'backend/controllers/ClientController'
import protectedHandler from 'backend/handlers/protectedHandler'

protectedHandler.post(ClientController.postClient)

protectedHandler.put(ClientController.putClient)

protectedHandler.delete(ClientController.deleteClient)

export default protectedHandler
