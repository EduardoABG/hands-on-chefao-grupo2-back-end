import { Router } from "express";
import { jobController } from "../controller";

const routes = Router();

routes.get("/jobs", jobController.listAll());
routes.get("/jobs/:id", jobController.list());
routes.post("/jobs", jobController.create());
routes.put("/jobs/:_id", jobController.update);
routes.delete("/jobs/:id", jobController.delete());

export default routes;
