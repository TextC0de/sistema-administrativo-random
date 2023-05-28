import BranchController from 'backend/controllers/BranchController'
import accessControl from 'backend/middleware/accessControl'
import { onError, onNoMatch } from 'backend/controllers/NextConnectController'
import nc from 'next-connect'

const protectedHandler = nc({ onError, onNoMatch })
protectedHandler.use(accessControl)
protectedHandler.post(BranchController.postBranch)

protectedHandler.put(BranchController.putBranch)

protectedHandler.delete(BranchController.deleteBranch)

export default protectedHandler
