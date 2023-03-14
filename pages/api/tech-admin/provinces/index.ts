import ProvinceController from 'backend/controllers/ProvinceController'
import protectedHandler from 'backend/handlers/protectedHandler';

protectedHandler.post(ProvinceController.post)

protectedHandler.put(ProvinceController.put)

protectedHandler.delete(ProvinceController.delete)

protectedHandler.get(ProvinceController.get)


export default protectedHandler

