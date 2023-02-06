import ActivityController from 'backend/controllers/ActivityController'

import protectedHandler from 'backend/handlers/protectedHandler'

protectedHandler.get(ActivityController.getTechActivities)

export default protectedHandler