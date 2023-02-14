import UserController from "backend/controllers/UserController";
import protectedHandler from "backend/handlers/protectedHandler";

protectedHandler.put(UserController.generateNewPassword)

export default protectedHandler