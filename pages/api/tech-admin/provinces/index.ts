import ProvinceController from 'backend/controllers/ProvinceController'
import accessControl from 'backend/middleware/accessControl'
import { onError, onNoMatch } from 'backend/controllers/NextConnectController'
import nc from 'next-connect'

const protectedHandler = nc({ onError, onNoMatch })
protectedHandler.use(accessControl)

protectedHandler.post(ProvinceController.postProvince)

protectedHandler.put(ProvinceController.putProvince)

protectedHandler.delete(ProvinceController.deleteProvince)

export default protectedHandler
