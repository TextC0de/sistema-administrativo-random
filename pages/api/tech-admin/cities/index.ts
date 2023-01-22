import CityController from 'backend/controllers/CityController'
import protectedHandler from 'backend/handlers/protectedHandler';

protectedHandler.post(CityController.postCity)

protectedHandler.put(CityController.putCity)

protectedHandler.delete(CityController.deleteCity)

export default protectedHandler

