import { Router } from "express";
import userRoutes from "../../modules/User/routes";

const routes = Router();

routes.use(userRoutes); // Comando para que a BasRoutes use a rota userRoutes. O App.ts já o aguardará.

export default routes;
