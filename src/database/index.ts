import Conection from "./Conection";

const mongoDBConection = new Conection("mongodb://localhost:27017/lacrei-api");
export { mongoDBConection };
