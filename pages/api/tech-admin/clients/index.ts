import ClientController from 'backend/controllers/ClientController'
import accessControl from 'backend/middleware/accessControl'
import { onError, onNoMatch } from 'backend/controllers/NextConnectController'
import nc from 'next-connect'

const protectedHandler = nc({ onError, onNoMatch })

protectedHandler.use(accessControl)

protectedHandler.post(ClientController.postClient)

protectedHandler.put(ClientController.putClient)

protectedHandler.delete(ClientController.deleteClient)

export default protectedHandler
