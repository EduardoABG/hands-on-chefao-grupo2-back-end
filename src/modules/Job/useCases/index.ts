import { jobRepository } from "../../../repositories";
import JobUseCase from "./JobUseCase";

const jobUseCase = new JobUseCase(jobRepository);
export { jobUseCase };
