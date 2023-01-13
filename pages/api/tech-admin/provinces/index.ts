import * as ProvinceController from 'backend/controllers/ProvinceController'
import protectedHandler from 'backend/handlers/protectedHandler';

protectedHandler.post(ProvinceController.postProvince)

export default protectedHandler

