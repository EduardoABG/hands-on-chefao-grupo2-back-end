import UserRepository from "./User";
import { User, Job, JobApplication, Mentoring } from "../models";
import JobRepository from "./Job";
import AuthRepository from "./auth";
import JobApplicationRepository from "./JobApplication";
import MentoringRepository from "./Mentoring";
const userRepository = new UserRepository(User);
const jobRepository = new JobRepository(Job);
const authRepository = new AuthRepository(User);
const jobApplicationRepository = new JobApplicationRepository(JobApplication);
const mentoringRepository = new MentoringRepository(Mentoring);
export {
  userRepository,
  jobRepository,
  authRepository,
  jobApplicationRepository,
  mentoringRepository,
};
