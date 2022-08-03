import { authRepository, userRepository } from "../../../repositories";
import AuthUseCase from "./AuthUseCase";

const authUseCase = new AuthUseCase(authRepository, userRepository);

export { authUseCase };
