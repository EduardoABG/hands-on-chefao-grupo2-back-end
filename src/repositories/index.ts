import UserRepository from "./User";
import { User, Job, JobApplication } from "../models";
import JobRepository from "./Job";
import AuthRepository from "./auth";
import JobApplicationRepository from "./JobApplication";
const userRepository = new UserRepository(User);
const jobRepository = new JobRepository(Job);
const authRepository = new AuthRepository(User);
const jobApplicationRepository = new JobApplicationRepository(JobApplication);
export {
  userRepository,
  jobRepository,
  authRepository,
  jobApplicationRepository,
};
