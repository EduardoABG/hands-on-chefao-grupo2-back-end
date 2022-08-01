import { Router } from "express";
import { jobApplicationController } from "../controller";
import auth from "../../../infra/middlewares/auth";

const routes = Router();

routes.get("/jobApplications", jobApplicationController.listAll());
routes.get("/jobApplications/:id", auth, jobApplicationController.list());
routes.post("/jobApplications", auth, jobApplicationController.create());
routes.put("/jobApplications/:id", jobApplicationController.update());
routes.delete("/jobApplications/:id", auth, jobApplicationController.delete());

export default routes;
