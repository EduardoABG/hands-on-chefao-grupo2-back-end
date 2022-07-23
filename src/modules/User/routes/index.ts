import { Router } from "express";
import { userController } from "../controller";

const routes = Router();

routes.post("/User", userController.create()); 
routes.get("/User", userController.list); 

export default routes;
