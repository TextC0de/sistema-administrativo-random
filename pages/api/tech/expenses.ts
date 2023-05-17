import ExpenseController from 'backend/controllers/ExpenseController'
import protectedHandler from 'backend/handlers/protectedHandler'

protectedHandler.post(ExpenseController.postTech)

export default protectedHandler
