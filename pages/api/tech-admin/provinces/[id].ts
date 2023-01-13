import * as ProvinceController from 'backend/controllers/ProvinceController';
import protectedHandler from 'backend/handlers/protectedHandler';

protectedHandler.put(ProvinceController.putProvince)

protectedHandler.delete(ProvinceController.deleteProvince)

export default protectedHandler