import { Router } from "express";
import { mentoringController } from "../controller";

const routes = Router();

routes.get("/mentorings", mentoringController.listAll());
routes.get("/mentorings/:id", mentoringController.list());
routes.post("/mentorings", mentoringController.create());
routes.put("/mentorings/:id", mentoringController.update());
routes.delete("/mentorings/:id", mentoringController.delete());

export default routes;
