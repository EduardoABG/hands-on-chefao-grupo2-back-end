import {Router} from "express";
import controller from "./controller";

const routes = Router();

routes.post("/User, controller.create"); // Criação da 1ª rota, cadastrar usuário.

export default routes;