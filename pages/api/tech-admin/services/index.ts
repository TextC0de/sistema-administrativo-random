import { getTechAdminServices } from 'backend/controllers/ServiceController';
import protectedHandler from 'backend/handlers/protectedHandler';


protectedHandler.get(getTechAdminServices)

export default protectedHandler