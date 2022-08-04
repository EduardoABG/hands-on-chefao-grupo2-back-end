import { jobApplicationRepository, jobRepository } from "../../../repositories";
import JobApplicationUseCase from "./JobApplicationUseCase";

const jobApplicationUseCase = new JobApplicationUseCase(
  jobApplicationRepository,
  jobRepository,
);
export { jobApplicationUseCase };
