import CityController from 'backend/controllers/CityController'
import protectedHandler from 'backend/handlers/protectedHandler';

protectedHandler.post(CityController.post)

protectedHandler.put(CityController.put)

protectedHandler.delete(CityController.delete)

protectedHandler.get(CityController.get)

export default protectedHandler

