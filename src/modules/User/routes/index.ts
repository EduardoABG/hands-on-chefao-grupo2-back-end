import { Router } from "express";
import { userController } from "../controller";
import userValidator from "../validators";

const routes = Router();

routes.get("/users", userController.listAll());
routes.get("/users/:id", userController.list());
routes.post("/users", userValidator.create, userController.create()); // Criação da 1ª rota, cadastrar usuário.
routes.put("/users/:_id", userValidator.update, userController.update());
routes.delete("/users/:id", userController.delete());


export default routes;
