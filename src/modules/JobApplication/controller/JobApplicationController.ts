import { Request, Response } from "express";
import JobApplicationUseCase from "../useCases/JobApplicationUseCase";

type BodyJobCreateApplication = {
  status: number;
  applicationDate: Date;
  user: string;
  job: {
    _id: string;
    name: string;
    companyName: string;
  };
};
type BodyJobApplicationUpdate = {
  status: number;
  feedback: {
    letter:  string,
    area: [{
	    tittle: string,
	    content: [{
	      text: string,
	      link: string,
	    }]
	  }]
  };
};
export default class JobApplicationController {
  private useCase: JobApplicationUseCase;

  constructor(useCase: JobApplicationUseCase) {
    this.useCase = useCase;
  }

  create() {
    return async (req: Request, res: Response) => {
      const { id: userId } = req.user as User;
      const { job_id: jobId } = req.body;

      const newJob = await this.useCase.createJobApplication({ userId, jobId });

      return res.status(201).json(newJob);
    };
  }

  update() {
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;

        const updateJobApplication = await this.useCase.updateJobApplication(
          id,
          req.body as BodyJobApplicationUpdate
        );
        return res.status(200).json(updateJobApplication);
      } catch (error) {
        console.log(error);
        return res.status(400);
      }
    };
  }

  listAll() {
    return async (req: Request, res: Response) => {
      const { id } = req.user as User;

      const jobApplicationList = await this.useCase.listAll(id);
      return res.json(jobApplicationList);
    };
  }

  listInProgress() {
    return async (req: Request, res: Response) => {
      const { id } = req.user as User;

      const inProgressList = await this.useCase.listInProgress(id);

      if (!inProgressList) {
        return res.status(404).json({ message: "Processo encerrado" });
      }

      return res.json(inProgressList);
    };
  }

  listFinished() {
    return async (req: Request, res: Response) => {
      const { id } = req.user as User;

      const finishedList = await this.useCase.listFinished(id);

      if (!finishedList) {
        return res.status(404).json({ message: "Processo encerrado" });
      }

      return res.json(finishedList);
    };
  }

  list() {
    return async (req: Request, res: Response) => {
      const { id: userId } = req.user as User;
      const { id: jobId } = req.params;

      const listJobApplication = await this.useCase.listJobApplication(jobId, userId);

      if (!listJobApplication) {
        return res.status(404).json({ message: "Processo encerrado" });
      }

      return res.json(listJobApplication);
    };
  }
  delete() {
    return async (req: Request, res: Response) => {
      const { id: userId } = req.user as User;
      const { id } = req.params;

      await this.useCase.deleteJobApplication(id, userId);

      return res.status(204).json("");
    };
  }
}
