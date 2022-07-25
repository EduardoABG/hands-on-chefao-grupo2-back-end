import { Router } from "express";
import { userController } from "../controller";

const routes = Router();

routes.post("/User", userController.create()); // Criação da 1ª rota, cadastrar usuário.
routes.put("/User", userController.update());
routes.get("/User", userController.list());
export default routes;
