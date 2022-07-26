import UserRepository from "./User";
import { User, Job } from "../models";
import JobRepository from "./Job";
const userRepository = new UserRepository(User);
const jobRepository = new JobRepository(Job);
export { userRepository, jobRepository };
