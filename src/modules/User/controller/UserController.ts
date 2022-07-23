import express from "express";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserUseCase from "../useCases/UserUseCase";
import User from "../../../models/User";

type BodyUserCreate = {
  name: string;
  email: string;
  password: string;
  phone: string;
  profilePicture: string;
};
type BodyUserUpdate = {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthDate: Date;
  aboutMe: string;
  profilePicture: string;
  resume: {
    employmentHistory: String[];
    education: String[];
    certificates: String[];
    languages: String[];
    linkedin: String;
    portfolio: String;
    address: String;
    salary: number;
    RG: String;
    CPF: String;
  };
};
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

        const newUser = await this.useCase.createUser(
          req.body as BodyUserCreate
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
          req.body as BodyUserUpdate,
          id
        );
        return res.status(204).json(updateUser);
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

