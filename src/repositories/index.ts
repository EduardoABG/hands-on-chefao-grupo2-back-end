import UserRepository from "./User";
import { user } from "../models";

const userRepository = new UserRepository(user);

export { userRepository };
