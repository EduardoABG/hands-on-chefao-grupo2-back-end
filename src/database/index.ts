import Conection from "./Conection";
import ENV from "../infra/config/env";

const mongoDBConection = new Conection(ENV.MONGO_URL);
export { mongoDBConection };
