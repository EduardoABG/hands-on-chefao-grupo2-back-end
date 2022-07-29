import { jobApplicationRepository } from "../../../repositories";
import JobApplicationUseCase from "./JobApplicationUseCase";

const jobApplicationUseCase = new JobApplicationUseCase(
  jobApplicationRepository
);
export { jobApplicationUseCase };
