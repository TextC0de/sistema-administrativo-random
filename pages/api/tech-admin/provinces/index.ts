import ProvinceController from 'backend/controllers/ProvinceController'
import protectedHandler from 'backend/handlers/protectedHandler'

protectedHandler.post(ProvinceController.postProvince)

protectedHandler.put(ProvinceController.putProvince)

protectedHandler.delete(ProvinceController.deleteProvince)

export default protectedHandler
