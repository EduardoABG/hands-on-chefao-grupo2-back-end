import MentoringController from "./MentoringController";
import { mentoringUseCase } from "../useCases";
const mentoringController = new MentoringController(
  mentoringUseCase
);

export { mentoringController };
