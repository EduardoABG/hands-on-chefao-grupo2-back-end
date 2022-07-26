import { Router } from "express";
import userRoutes from "../../modules/User/routes";
import jobRoutes from "../../modules/Job/routes";

const routes = Router();

routes.use(userRoutes); // Comando para que a BasRoutes use a rota userRoutes. O App.ts já o aguardará.
routes.use(jobRoutes);
export default routes;
