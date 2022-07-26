import { Router } from "express";
import { jobController } from "../controller";

const routes = Router();

routes.get("/jobs", jobController.listAll());
routes.get("/jobs/:id", jobController.list());

export default routes;
