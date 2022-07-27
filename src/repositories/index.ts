import UserRepository from "./User";
import { User, Job } from "../models";
import JobRepository from "./Job";
import AuthRepository from "./auth";
const userRepository = new UserRepository(User);
const jobRepository = new JobRepository(Job);
const authRepository = new AuthRepository(User);
export { userRepository, jobRepository, authRepository };
