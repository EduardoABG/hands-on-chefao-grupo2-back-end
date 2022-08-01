import { Request, Response } from "express";
import JobApplicationUseCase from "../useCases/JobApplicationUseCase";

type BodyJobCreateApplication = {
  status: string;
  feedback: string;
  tagsFeedback: string[];
  applicationDate: Date;
  user: string;
  job: {
    _id: string;
    name: string;
    companyName: string;
  };
};
type BodyobApplicationUpdate = {
  status: string;
  feedback: string;
  tagsFeedback: string[];
};
export default class JobApplicationController {
  private useCase: JobApplicationUseCase;
  constructor(useCase: JobApplicationUseCase) {
    this.useCase = useCase;
  }
  create() {
    return async (req: Request, res: Response) => {
      try {
        const newJob = await this.useCase.createJobApplication(
          req.body as BodyJobCreateApplication
        );

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
    return async (req: Request, res: Response) => {
      try {
        const { id } = req.params;

        const updateJobApplication = await this.useCase.updateJobApplication(
          id,
          req.body as BodyobApplicationUpdate
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
      try {
        const jobApplicationList = await this.useCase.listAll();
        return res.json(jobApplicationList);
      } catch (error) {
        console.log(error);
        return res.status(500);
      }
    };
  }

  listInProgress() {
    return async (req: Request, res: Response) => {
      try {
        const inProgressList = await this.useCase.listInProgress();

        if (!inProgressList) {
          return res.status(404).json({ message: "Processo encerrado" });
        }

        return res.json(inProgressList);
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

        const listJobApplication = await this.useCase.listJobApplication(id);

        if (!listJobApplication) {
          return res.status(404).json({ message: "Processo encerrado" });
        }

        return res.json(listJobApplication);
      } catch (error) {
        console.log(error);
        return res.status(400);
      }
    };
  }
  delete() {
    return async (req: Request, res: Response) => {
      const { id } = req.params;

      await this.useCase.deleteJobApplication(id);

      return res.status(204).json("");
    };
  }
}
