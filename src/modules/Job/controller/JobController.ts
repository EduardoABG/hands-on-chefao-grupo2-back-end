import { Request, Response } from "express";
import JobUseCase from "../useCases/JobUseCase";

type BodyJobCreate = {
  name: string;
  description: string;
  salary: number;
  companyName: string;
  status: string;
  date: Date;
};

export default class JobController {
  private useCase: JobUseCase;
  constructor(useCase: JobUseCase) {
    this.useCase = useCase;
  }
  create() {
    return async (req: Request, res: Response) => {
      try {
        const newJob = await this.useCase.createJob(req.body as BodyJobCreate);

        if (newJob) {
          return res.status(201).json(newJob);
        }
      } catch (error) {
        console.log(error);
        return res.status(400);
      }
    };
  }

  update() {
    console.log("update route");
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
  delete() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;

        const deleteJob = await this.useCase.deleteJob(id);
        if (!deleteJob) {
          return res.status(404).json({ message: "Vaga não encontrada" });
        }
        return res.status(200);
      } catch (error) {
        console.log(error);
        return res.status(400);
      }
    };
  }
}
