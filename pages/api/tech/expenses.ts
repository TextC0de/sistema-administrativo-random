import ExpenseController from 'backend/controllers/ExpenseController'
import accessControl from 'backend/middleware/accessControl'
import { onError, onNoMatch } from 'backend/controllers/NextConnectController'
import nc from 'next-connect'

const protectedHandler = nc({ onError, onNoMatch })
protectedHandler.use(accessControl)
protectedHandler.post(ExpenseController.postTech)

export default protectedHandler
