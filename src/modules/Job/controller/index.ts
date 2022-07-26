import JobController from "./JobController";
import { jobUseCase } from "../useCases";
const jobController = new JobController(jobUseCase);
export { jobController };
