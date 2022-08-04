import { Router } from "express";
import { jobApplicationController } from "../controller";
import auth from "../../../infra/middlewares/auth";
import JobApplicationValidator from "../validators";

const routes = Router();

routes.get("/jobApplications/dashboard", auth, jobApplicationController.dashboard());
routes.get("/jobApplications", auth, jobApplicationController.listAll());
routes.get("/jobApplications/progress", auth, jobApplicationController.listInProgress());
routes.get("/jobApplications/finished", auth, jobApplicationController.listFinished());
routes.get("/jobApplications/:id", auth, jobApplicationController.list());
routes.post("/jobApplications", auth, JobApplicationValidator.create, jobApplicationController.create());
routes.put("/jobApplications/:id", JobApplicationValidator.update, jobApplicationController.update());
routes.delete("/jobApplications/:id", auth, jobApplicationController.delete());



export default routes;
