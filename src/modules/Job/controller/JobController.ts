import { Request, Response } from "express";
import JobUseCase from "../useCases/JobUseCase";
import Job from "../../../models/Job";

export default class JobController {
  private useCase: JobUseCase;
  constructor(useCase: JobUseCase) {
    this.useCase = useCase;
  }
  listAll() {
    return async (req: Request, res: Response) => {
      try {
        const jobList = await this.useCase.listAll();
        return res.json(jobList);
      } catch (error) {
        console.log(error);
        return res.status(500);
      }
    };
  }

  list() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;

        const listJob = await this.useCase.listJob(id);

        if (!listJob) {
          return res.status(404).json({ message: "Vaga não encontrada" });
        }

        return res.json(listJob);
      } catch (error) {
        console.log(error);
        return res.status(400);
      }
    };
  }
}
