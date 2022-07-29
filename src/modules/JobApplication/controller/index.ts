import JobApplicationController from "./JobApplicationController";
import { jobApplicationUseCase } from "../useCases";
const jobApplicationController = new JobApplicationController(
  jobApplicationUseCase
);

export { jobApplicationController };
