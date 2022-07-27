import AuthController from "./AuthController";
import { authUseCase } from "../useCase";
const authController = new AuthController(authUseCase);
export { authController };
