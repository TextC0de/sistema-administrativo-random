import CityController from 'backend/controllers/CityController'
import accessControl from 'backend/middleware/accessControl'
import { onError, onNoMatch } from 'backend/controllers/NextConnectController'
import nc from 'next-connect'

const protectedHandler = nc({ onError, onNoMatch })
protectedHandler.use(accessControl)

protectedHandler.post(CityController.postCity)

protectedHandler.put(CityController.putCity)

protectedHandler.delete(CityController.deleteCity)

export default protectedHandler
