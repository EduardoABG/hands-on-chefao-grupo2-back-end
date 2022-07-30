import { Request, Response } from "express";
import UserUseCase from "../useCases/UserUseCase";

export default class UserController {
  private useCase: UserUseCase;

  constructor(useCase: UserUseCase) {
    this.useCase = useCase;
  }

  create() {
    return async (req: Request, res: Response) => {
      const { name, email, password, phone, profilePicture } = req.body;

      const newUser = await this.useCase.createUser({
          name,
          email,
          password,
          phone,
          profilePicture: req.file ? { type: "cloudinary", resource: req.file.path } : { type: "link", resource: profilePicture },
      });

      return res.status(201).json(newUser);
    };
  }

  update() {
    return async (req: Request, res: Response) => {
      const { id } = req.params;

      const updateUser = await this.useCase.updateUser(
        id,
        req.body,
        req.file ? { type: "cloudinary", resource: req.file.path } : { type: "link", resource: req.body.profilePicture },
      );

      return res.status(200).json(updateUser);
    };
  }

  listAll() {
    return async (req: Request, res: Response) => {
      try {
        const userList = await this.useCase.listAll();
        return res.json(userList);

      } catch (error) {
        console.log(error);
        return res.status(500);
      }
    }
  }

  list() {
    return async (req: Request, res: Response) => {
      const { id } = req.params;

      const listUser = await this.useCase.listUser(id);

      if(!listUser) {
        return res.status(404).json({ message: "Usuario não encontrado" });
      }

      return res.json(listUser);
    };
  }

  delete() {
    return async (req: Request, res: Response) => {
      const { id } = req.params;
      await this.useCase.delete(id);

      return res.status(204).json("");
    }
  }
}
