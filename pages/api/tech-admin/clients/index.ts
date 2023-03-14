import ClientController from 'backend/controllers/ClientController'
import protectedHandler from 'backend/handlers/protectedHandler';

protectedHandler.post(ClientController.post)

protectedHandler.put(ClientController.put)

protectedHandler.delete(ClientController.delete)

protectedHandler.get(ClientController.get)

export default protectedHandler

