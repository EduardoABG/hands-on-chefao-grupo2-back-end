import { Router } from "express";
import { mentoringController } from "../controller";

const routes = Router();

routes.get("/mentoring", mentoringController.listAll());
routes.get("/mentoring/:id", mentoringController.list());
routes.post("/mentoring", mentoringController.create());
routes.put("/mentoring/:id", mentoringController.update());
routes.delete("/mentoring/:id", mentoringController.delete());

export default routes;