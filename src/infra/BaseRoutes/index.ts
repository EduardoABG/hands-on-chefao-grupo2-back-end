import { Router } from "express";
import userRoutes from "../../modules/User/routes";
import jobRoutes from "../../modules/Job/routes";
import authRoutes from "../../modules/auth/routes";
import mentoringRoutes from "../../modules/Mentoring/routes";
import jobApplicationRoutes from "../../modules/JobApplication/routes";

const routes = Router();
// Comando para que a BasRoutes use a rota nRoutes. O App.ts já o aguardará:
routes.use(userRoutes);
routes.use(jobRoutes);
routes.use(authRoutes);
routes.use(jobApplicationRoutes);
routes.use(mentoringRoutes);
routes.use(jobApplicationRoutes);

export default routes;
