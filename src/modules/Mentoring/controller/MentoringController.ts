import { Request, Response } from "express";
import MentoringUseCase from "../useCases/MentoringUseCase";

type BodyMentoringCreate = {
  name: string;
  description: string;
  price: number;
};
type BodyMentoringUpdate = {
  name: string;
  description: string;
  price: number;
};
export default class MentoringController {
  private useCase: MentoringUseCase;
  constructor(useCase: MentoringUseCase) {
    this.useCase = useCase;
  }
  create() {
    return async (req: Request, res: Response) => {
      try {
        const newMentoring = await this.useCase.createMentoring(
          req.body as BodyMentoringCreate
        );

        if (newMentoring) {
          return res.status(201).json(newMentoring);
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

        const updateMentoring = await this.useCase.updateMentoring(
          id,
          req.body as BodyMentoringUpdate
        );
        return res.status(200).json(updateMentoring);
      } catch (error) {
        console.log(error);
        return res.status(400);
      }
    };
  }

  listAll() {
    return async (req: Request, res: Response) => {
      try {
        const mentoringList = await this.useCase.listAll();
        return res.json(mentoringList);
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

        const listMentoring = await this.useCase.listMentoring(id);

        if (!listMentoring) {
          return res.status(404).json({ message: "Processo encerrado" });
        }

        return res.json(listMentoring);
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

        const deleteMentoring = await this.useCase.deleteMentoring(
          id
        );
        if (!deleteMentoring) {
          return res.status(404).json({ message: "Processo encerrado" });
        }
        return res.status(200);
      } catch (error) {
        console.log(error);
        return res.status(400);
      }
    };
  }
}
