import { Router } from "express";
import { userController } from "../controller";

const routes = Router();

routes.get("/users", userController.listAll());
routes.get("/users/:id", userController.list());
routes.post("/users", userController.create()); // Criação da 1ª rota, cadastrar usuário.
routes.put("/users/:_id", userController.update());
routes.delete("/users/:_id", userController.delete);


export default routes;
