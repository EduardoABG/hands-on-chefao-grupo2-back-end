import { authRepository } from "../../../repositories";
import AuthUseCase from "./AuthUseCase";

const authUseCase = new AuthUseCase(authRepository);

export { authUseCase };
