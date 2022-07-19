import { userRepository } from "../../../repositories";
import UserUseCase from "./UserUseCase";

const userUseCase = new UserUseCase(userRepository);
export { userUseCase };
