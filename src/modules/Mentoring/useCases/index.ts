import { mentoringRepository } from "../../../repositories";
import MentoringUseCase from "./MentoringUseCase";

const mentoringUseCase = new MentoringUseCase(
  mentoringRepository
);
export { mentoringUseCase };