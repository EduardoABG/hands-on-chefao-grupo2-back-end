import { Request, Response } from "express";
import JobUseCase from "../useCases/JobUseCase";

export default class JobController {
  private useCase: JobUseCase;

  constructor(useCase: JobUseCase) {
    this.useCase = useCase;
  }

  create() {
    return async (req: Request, res: Response) => {
      const newJob = await this.useCase.createJob(req.body);

      if (newJob) {
        return res.status(201).json(newJob);
      }
    };
  }

  update() {
    console.log("update route");
  }

  listAll() {
    return async (req: Request, res: Response) => {
      const jobList = await this.useCase.listAll(req.query)

      return res.json(jobList);
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
  delete() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;
        await this.useCase.deleteJob(id);
        return res.status(204).json("");
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ statusCode: 500, message: "Internal Server Error" });
      }
    };
  }
}
