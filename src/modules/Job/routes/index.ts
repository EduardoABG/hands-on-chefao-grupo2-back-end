import { Router } from "express";
import { jobController } from "../controller";
import JobValidator from "../validators";

const routes = Router();

routes.get("/jobs", jobController.listAll());
routes.get("/jobs/:id", jobController.list());
routes.post("/jobs", JobValidator.create, jobController.create());
routes.put("/jobs/:id", JobValidator.update, jobController.update());
routes.delete("/jobs/:id", jobController.delete());

routes.get("/jobs/candidates/:id", jobController.candidatesCounter());

export default routes;
