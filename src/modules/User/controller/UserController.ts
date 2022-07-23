import express from "express";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserUseCase from "../useCases/UserUseCase";
import User from "../../../models/User";

type BodyUser = { id: number; name: string; email: string, password: string };
export default class UserController {
  private useCase: UserUseCase;
  constructor(useCase: UserUseCase) {
    this.useCase = useCase;
  }
  create() {
    return async (req: Request, res: Response) => {
      try {
        const { id, name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const savedUser = await User.count({
          email,
        });
        if (savedUser) {
          return res.status(400).json("Este e-mail já está cadastrado.");
        }
        req.body.password = hashedPassword
        const newUser = await this.useCase.cadastrarUsuario(
          req.body as BodyUser
        );
        return res.status(201).json(newUser);
      } catch (error) {
        console.log(error);
        return res.status(400);
      }
    };
  }
  async list(req: Request, res: Response){
    const users = await User.find()

    return res.json(users);
  }
}
