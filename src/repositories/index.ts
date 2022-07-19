import UserRepository from "./User";
import { User } from "../models";

const userRepository = new UserRepository(User);

export { userRepository };
