import { jobRepository, jobApplicationRepository } from "../../../repositories";
import JobUseCase from "./JobUseCase";

const jobUseCase = new JobUseCase(jobRepository, jobApplicationRepository);
export { jobUseCase };
