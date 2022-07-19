import { Router } from "express";
import { userController } from "../controller";

const routes = Router();

routes.post("/User", userController.create()); // Criação da 1ª rota, cadastrar usuário.

export default routes;
