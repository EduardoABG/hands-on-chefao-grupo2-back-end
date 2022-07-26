import { Router } from "express";
import { userController } from "../controller";

const routes = Router();

routes.post("/users", userController.create()); // Criação da 1ª rota, cadastrar usuário.
routes.put("/users/:_id", userController.update());
routes.get("/users/:_id", userController.list());

export default routes;
