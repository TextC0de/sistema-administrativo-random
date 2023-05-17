import BranchController from 'backend/controllers/BranchController'
import protectedHandler from 'backend/handlers/protectedHandler'

protectedHandler.post(BranchController.postBranch)

protectedHandler.put(BranchController.putBranch)

protectedHandler.delete(BranchController.deleteBranch)

export default protectedHandler
