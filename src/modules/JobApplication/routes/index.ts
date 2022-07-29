import { Router } from "express";
import { jobApplicationController } from "../controller";

const routes = Router();

routes.get("/jobApplications", jobApplicationController.listAll());
routes.get("/jobApplications/:id", jobApplicationController.list());
routes.post("/jobApplications", jobApplicationController.create());
routes.put("/jobApplications/:id", jobApplicationController.update());
routes.delete("/jobApplications/:id", jobApplicationController.delete());

export default routes;
