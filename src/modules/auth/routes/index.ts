import { Router } from "express";
import { authController } from "../controllers";
import auth from "../../../infra/middlewares/auth";
const routes = Router();

routes.post("/login", authController.login());
routes.post("/reset-senha", auth, authController.tokenGenerator());

export default routes;
