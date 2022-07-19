import UserController from "./UserController";
import { userUseCase } from "../useCases";
const userController = new UserController(userUseCase);
export { userController };
