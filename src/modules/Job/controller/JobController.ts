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
    return async (req: Request, res: Response) => {
      const { id } = req.params;

      const updateJob = await this.useCase.updateJob(id, req.body);

      return res.status(200).json(updateJob)
    }
  }

  listAll() {
    return async (req: Request, res: Response) => {
      const jobList = await this.useCase.listAll(req.query)

      return res.json(jobList);
    };
  }

  list() {
    return async (req: Request, res: Response) => {
      const { id } = req.params;

      const listJob = await this.useCase.listJob(id);

      return res.json(listJob);
    };
  }
  delete() {
    return async (req: Request, res: Response) => {
      const { id } = req.params;

      await this.useCase.deleteJob(id);

      return res.status(204).json("");
    };
  }
}
