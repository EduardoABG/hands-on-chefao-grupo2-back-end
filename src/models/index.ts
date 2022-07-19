import User from "./User";
import { mongoDBConection } from "../database/index";

const user = new User(mongoDBConection);

export { user };
