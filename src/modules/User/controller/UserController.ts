import { Request, Response } from "express";
import UserUseCase from "../useCases/UserUseCase";
import User from "../../../models/User";
import cloudinary from "../../../infra/config/cloudinary";


export default class UserController {
  private useCase: UserUseCase;
  constructor(useCase: UserUseCase) {
    this.useCase = useCase;
  }
  create() {
    return async (req: Request, res: Response) => {
      try {
        const { email } = req.body;
        const savedUser = await User.count({
          email,
        });
        if (savedUser) {
          return res.status(400).json("Este e-mail já está cadastrado.");
        }

        if(!req.file) {
          return res.status(400).json("O envio da foto de perfil é obrigatorio");
        }

        const newUser = await this.useCase.createUser(
          {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            profilePicture: req.file.path,
          }
        );
        return res.status(201).json(newUser);
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

        const updateUser = await this.useCase.updateUser(
          id,
          req.body,
          req.file
        );
        return res.status(200).json(updateUser);
      } catch (error) {
        console.log(error);
        return res.status(400);
      }
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
      try {
        const { id } = req.params;

        const listUser = await this.useCase.listUser(id);

        if(!listUser) {
          return res.status(404).json({ message: "Usuario não encontrado" });
        }

        return res.json(listUser);
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
        await this.useCase.delete(id);
        return res.status(204).json("");
      } catch (error) {
        return res.status(500).json("");
      }
    }
  }
}
